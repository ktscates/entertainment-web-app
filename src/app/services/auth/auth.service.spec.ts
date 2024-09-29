import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { Auth, User } from '@angular/fire/auth'

class MockAuth {
  createUserWithEmailAndPassword = jest.fn()
  signInWithEmailAndPassword = jest.fn()
  signOut = jest.fn().mockResolvedValue({})
  onAuthStateChanged = jest.fn((auth, callback) => {
    callback(null)
    return () => {}
  })
}

describe('AuthService', () => {
  let service: AuthService
  let mockAuth: MockAuth

  beforeEach(() => {
    mockAuth = new MockAuth()

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Auth, useValue: mockAuth }],
    }).compileComponents()

    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should log out a user', async () => {
    await service.logout()
    expect(mockAuth.signOut).toHaveBeenCalled()
  })

  it('should initialize currentUser$ with the auth state', () => {
    const mockUser = {
      uid: 'user123',
      email: 'test@example.com',
    } as User
    ;(mockAuth.onAuthStateChanged as jest.Mock).mockImplementation(
      (auth, callback) => {
        callback(mockUser)
        return jest.fn()
      }
    )
    service.currentUser$.subscribe(user => {
      expect(user).toEqual(mockUser)
    })
  })

  it('should initialize currentUser$ as null if no user is logged in', () => {
    ;(mockAuth.onAuthStateChanged as jest.Mock).mockImplementation(
      (auth, callback) => {
        callback(null)
        return jest.fn()
      }
    )
    service.currentUser$.subscribe(user => {
      expect(user).toBeNull()
    })
  })
})
