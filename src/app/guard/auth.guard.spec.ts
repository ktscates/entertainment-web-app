import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { AuthGuard } from './auth.guard'
import { AuthService } from '../services/auth/auth.service'
import { of, throwError } from 'rxjs'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let authService: AuthService
  let router: Router

  beforeEach(() => {
    const authServiceMock = {
      getCurrentUserId: jest.fn(),
    }

    const routerMock = {
      navigate: jest.fn(),
    }

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    })
    guard = TestBed.inject(AuthGuard)
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
  })

  it('should return true if the user is authenticated', () => {
    jest.spyOn(authService, 'getCurrentUserId').mockReturnValue(of('userId'))
    guard.canActivate().subscribe(result => {
      expect(result).toBe(true)
    })
  })

  it('should navigate to /auth and return false if the user is not authenticated', () => {
    jest.spyOn(authService, 'getCurrentUserId').mockReturnValue(of(null))
    guard.canActivate().subscribe(result => {
      expect(result).toBe(false)
      expect(router.navigate).toHaveBeenCalledWith(['/auth'])
    })
  })

  it('should navigate to /auth and return false on error', () => {
    jest
      .spyOn(authService, 'getCurrentUserId')
      .mockReturnValue(throwError(() => new Error('error')))
    guard.canActivate().subscribe(result => {
      expect(result).toBe(false)
      expect(router.navigate).toHaveBeenCalledWith(['/auth'])
    })
  })
})
