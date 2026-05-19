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

function mockCreateEvent(clientError: any, eventError: any, staffError: any = null) {
  const mockClientFrom = {
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { id: 'client-uuid' }, error: clientError }),
      }),
    }),
  }
  const mockEventFrom = {
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { id: 'event-uuid' }, error: eventError }),
      }),
    }),
  }
  const mockStaffFrom = {
    insert: vi.fn().mockResolvedValue({ data: null, error: staffError }),
  }
  vi.mocked(supabase.from)
    .mockReturnValueOnce(mockClientFrom as any)
    .mockReturnValueOnce(mockEventFrom as any)
    .mockReturnValueOnce(mockStaffFrom as any)
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

  it('should create event without staff successfully', async () => {
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

  it('should create event with staff successfully', async () => {
    mockCreateEvent(null, null, null)

    const result = await service.createEvent({
      eventName: 'Cumpleaños de Juan',
      customerName: 'María López',
      staff: [{ employeeId: 'emp-1' }, { employeeId: 'emp-2' }],
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

  it('should return ok:false when staff insert fails', async () => {
    mockCreateEvent(null, null, { message: 'staff insert failed' })

    const result = await service.createEvent({
      eventName: 'Evento X',
      staff: [{ employeeId: 'emp-1' }],
    })

    expect(result.ok).toBe(false)
  })

  // updateEvent helpers
  function mockUpdateEvent(clientError: any, eventError: any, deleteError: any = null, staffError: any = null) {
    const mockClientFrom = {
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: clientError }),
      }),
    }
    const mockEventFrom = {
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: eventError }),
      }),
    }
    const mockDeleteFrom = {
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: deleteError }),
      }),
    }
    const mockStaffInsertFrom = {
      insert: vi.fn().mockResolvedValue({ error: staffError }),
    }
    vi.mocked(supabase.from)
      .mockReturnValueOnce(mockClientFrom as any)
      .mockReturnValueOnce(mockEventFrom as any)
      .mockReturnValueOnce(mockDeleteFrom as any)
      .mockReturnValueOnce(mockStaffInsertFrom as any)
  }

  it('should update event successfully', async () => {
    mockUpdateEvent(null, null, null, null)

    const result = await service.updateEvent('event-uuid', {
      clientId: 'client-uuid',
      customerName: 'María López',
      eventName: 'Cumpleaños Actualizado',
      staff: [{ employeeId: 'emp-1' }],
    })

    expect(result.ok).toBe(true)
  })

  it('should return ok:false when client update fails', async () => {
    mockUpdateEvent({ message: 'client update failed' }, null)

    const result = await service.updateEvent('event-uuid', { clientId: 'client-uuid' })

    expect(result.ok).toBe(false)
  })

  it('should return ok:false when event update fails', async () => {
    mockUpdateEvent(null, { message: 'event update failed' })

    const result = await service.updateEvent('event-uuid', { clientId: 'client-uuid' })

    expect(result.ok).toBe(false)
  })

  it('should return ok:false when staff delete fails', async () => {
    mockUpdateEvent(null, null, { message: 'delete failed' })

    const result = await service.updateEvent('event-uuid', { clientId: 'client-uuid' })

    expect(result.ok).toBe(false)
  })
})
