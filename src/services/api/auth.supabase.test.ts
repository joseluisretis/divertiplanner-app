import { describe, it, expect, vi, beforeEach } from 'vitest'
import { supabase } from '../../lib/supabase'
import { AuthSupabase } from './auth.supabase'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    })),
    removeChannel: vi.fn(),
  },
}))

describe('AuthSupabase', () => {
  let service: AuthSupabase

  beforeEach(() => {
    service = new AuthSupabase()
    vi.clearAllMocks()
  })

  it('should login successfully with email', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: {
        user: {
          id: 'u1',
          email: 'test@example.com',
          user_metadata: { name: 'Test User', role: 'admin' },
        },
        session: null,
      },
      error: null,
    } as any)

    const result = await service.login({ username: 'test@example.com', password: 'secret' })

    expect(result.ok).toBe(true)
    expect(result.data?.user).toMatchObject({
      id: 'u1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin',
    })
  })

  it('should convert username without @ to email', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: {
        user: {
          id: 'u2',
          email: 'juan@divertiplanner.com',
          user_metadata: {},
        },
        session: null,
      },
      error: null,
    } as any)

    const result = await service.login({ username: 'juan', password: 'pass' })

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'juan@divertiplanner.com',
      password: 'pass',
    })
    expect(result.ok).toBe(true)
    expect(result.data?.user.name).toBe('juan')
  })

  it('should return ok:false on login error', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid credentials' },
    } as any)

    const result = await service.login({ username: 'bad', password: 'bad' })

    expect(result.ok).toBe(false)
    expect(result.messages).toBe('Invalid credentials')
    expect(result.data).toBeNull()
  })

  it('should logout by calling signOut', async () => {
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null } as any)

    await service.logout()

    expect(supabase.auth.signOut).toHaveBeenCalled()
  })
})
