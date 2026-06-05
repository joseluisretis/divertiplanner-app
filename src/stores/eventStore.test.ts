import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useEventStore } from './eventStore'
import { supabase } from '../services/supabase/supabase'

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    })),
    removeChannel: vi.fn(),
  },
}))

describe('useEventStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useEventStore.getState().unsubscribe()
    useEventStore.setState({ events: [], isLoading: false, error: null })
  })

  it('should fetch and store events', async () => {
    const mockOrder = vi.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Fiesta Infantil',
          status: 'PENDIENTE',
          customer_name: 'Ana P.',
          date_str: '20 Nov, 15:00 • 3h',
          location: 'Parque Central',
          is_featured: true,
        },
      ],
      error: null,
    })

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({ order: mockOrder }),
    } as any)

    await useEventStore.getState().fetchEvents()

    const state = useEventStore.getState()
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.events).toHaveLength(1)
    expect(state.events[0].title).toBe('Fiesta Infantil')
  })

  it('should handle fetch errors', async () => {
    const mockOrder = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'network error' },
    })

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({ order: mockOrder }),
    } as any)

    await useEventStore.getState().fetchEvents()

    const state = useEventStore.getState()
    expect(state.isLoading).toBe(false)
    expect(state.error).toBe('Error obteniendo eventos')
    expect(state.events).toEqual([])
  })

  it('should unsubscribe realtime channel', async () => {
    const mockOrder = vi.fn().mockResolvedValue({ data: [], error: null })
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({ order: mockOrder }),
    } as any)

    await useEventStore.getState().fetchEvents()
    useEventStore.getState().unsubscribe()
    expect(supabase.removeChannel).toHaveBeenCalled()
  })
})
