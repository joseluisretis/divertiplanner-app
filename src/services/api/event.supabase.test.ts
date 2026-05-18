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

describe('EventSupabase', () => {
  let service: EventSupabase

  beforeEach(() => {
    service = new EventSupabase()
    vi.clearAllMocks()
  })

  it('should return mapped events on success', async () => {
    const mockOrder = vi.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Gran Gala',
          status: 'PENDIENTE',
          customer_name: 'Familia R',
          date_str: '24 Oct, 18:00 • 4h',
          location: 'Sala A',
          is_featured: true,
        },
      ],
      error: null,
    })

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({ order: mockOrder }),
    } as any)

    const result = await service.getEvents()

    expect(result.ok).toBe(true)
    expect(result.data).toHaveLength(1)
    expect(result.data[0]).toMatchObject({
      id: '1',
      title: 'Gran Gala',
      customerName: 'Familia R',
      dateStr: '24 Oct, 18:00 • 4h',
      location: 'Sala A',
      isFeatured: true,
    })
  })

  it('should return ok:false on supabase error', async () => {
    const mockOrder = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'connection failed' },
    })

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({ order: mockOrder }),
    } as any)

    const result = await service.getEvents()

    expect(result.ok).toBe(false)
    expect(result.data).toEqual([])
  })

  it('should return empty array when no rows', async () => {
    const mockOrder = vi.fn().mockResolvedValue({ data: null, error: null })

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({ order: mockOrder }),
    } as any)

    const result = await service.getEvents()

    expect(result.ok).toBe(true)
    expect(result.data).toEqual([])
  })
})
