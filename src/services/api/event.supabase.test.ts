import { describe, it, expect, vi, beforeEach } from 'vitest'
import { supabase } from '../../lib/supabase'
import { EventSupabase } from './event.supabase'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    })),
    removeChannel: vi.fn(),
  },
}))

function mockSelectOrder(returnValue: { data: any; error: any }) {
  const mockOrder = vi.fn().mockResolvedValue(returnValue)
  vi.mocked(supabase.from).mockReturnValue({
    select: vi.fn().mockReturnValue({ order: mockOrder }),
  } as any)
}

function mockCreateEvent(clientError: any, eventError: any) {
  const mockClientFrom = {
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { id: 'client-uuid' }, error: clientError }),
      }),
    }),
  }
  const mockEventFrom = {
    insert: vi.fn().mockResolvedValue({ data: null, error: eventError }),
  }
  vi.mocked(supabase.from)
    .mockReturnValueOnce(mockClientFrom as any)
    .mockReturnValueOnce(mockEventFrom as any)
}

describe('EventSupabase', () => {
  let service: EventSupabase

  beforeEach(() => {
    service = new EventSupabase()
    vi.resetAllMocks()
  })

  it('should return mapped events on success', async () => {
    mockSelectOrder({
      data: [
        {
          id: '1',
          title: 'Gran Gala',
          status: 'PENDIENTE',
          clients: { name: 'Familia R' },
          event_date: '2023-10-24',
          location: 'Sala A',
          is_featured: true,
        },
      ],
      error: null,
    })

    const result = await service.getEvents()

    expect(result.ok).toBe(true)
    expect(result.data).toHaveLength(1)
    expect(result.data[0]).toMatchObject({
      id: '1',
      title: 'Gran Gala',
      customerName: 'Familia R',
      dateStr: '2023-10-24',
      location: 'Sala A',
      isFeatured: true,
    })
  })

  it('should return ok:false on supabase error', async () => {
    mockSelectOrder({ data: null, error: { message: 'connection failed' } })

    const result = await service.getEvents()

    expect(result.ok).toBe(false)
    expect(result.data).toEqual([])
  })

  it('should return empty array when no rows', async () => {
    mockSelectOrder({ data: null, error: null })

    const result = await service.getEvents()

    expect(result.ok).toBe(true)
    expect(result.data).toEqual([])
  })

  it('should create event successfully', async () => {
    mockCreateEvent(null, null)

    const result = await service.createEvent({
      eventName: 'Cumpleaños de Juan',
      customerName: 'María López',
      phone: '+51 999 888 777',
      eventType: 'Cumpleaños',
      address: 'Av. Principal 123',
      totalCost: 500,
    })

    expect(result.ok).toBe(true)
  })

  it('should return ok:false when client insert fails', async () => {
    mockCreateEvent({ message: 'client insert failed' }, null)

    const result = await service.createEvent({ eventName: 'Evento X' })

    expect(result.ok).toBe(false)
  })

  it('should return ok:false when event insert fails', async () => {
    mockCreateEvent(null, { message: 'event insert failed' })

    const result = await service.createEvent({ eventName: 'Evento X' })

    expect(result.ok).toBe(false)
  })
})
