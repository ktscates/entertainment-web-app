import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthComponent } from './auth.component'
import { AuthService } from '../../services/auth/auth.service'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

class MockAuthService {
  signUp = jest.fn()
  login = jest.fn()
}

class MockRouter {
  navigate = jest.fn()
}

describe('AuthComponent', () => {
  let component: AuthComponent
  let fixture: ComponentFixture<AuthComponent>
  let mockAuthService: MockAuthService
  let mockRouter: MockRouter

  beforeEach(async () => {
    mockAuthService = new MockAuthService()
    mockRouter = new MockRouter()

    await TestBed.configureTestingModule({
      imports: [AuthComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AuthComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the form with default values', () => {
    const formValues = component.authForm.value
    expect(formValues.email).toEqual('')
    expect(formValues.password).toEqual('')
    expect(formValues.confirmPassword).toEqual('')
  })

  it('should set the form as invalid initially', () => {
    expect(component.authForm.valid).toBeFalsy()
  })

  it('should toggle between sign-up and login modes', () => {
    component.isSignUp = false
    component.toggleMode()
    expect(component.isSignUp).toBeTruthy()

    component.toggleMode()
    expect(component.isSignUp).toBeFalsy()
  })

  it('should clear the confirmPassword field when toggled to login mode', () => {
    component.isSignUp = true
    component.authForm.get('confirmPassword')?.setValue('password123')
    component.toggleMode()
    expect(component.authForm.get('confirmPassword')?.value).toBe(null)
  })
  it('should not submit the form if it is invalid', () => {
    component.authForm.patchValue({
      email: '',
      password: '',
      confirmPassword: '',
    })
    component.onSubmit()
    expect(mockAuthService.signUp).not.toHaveBeenCalled()
    expect(mockAuthService.login).not.toHaveBeenCalled()
  })

  it('should call signUp if form is valid and in sign-up mode', () => {
    component.isSignUp = true
    component.authForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    })
    mockAuthService.signUp.mockReturnValue(Promise.resolve({ user: {} }))
    component.onSubmit()
    expect(mockAuthService.signUp).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    )
  })

  it('should call login if form is valid and in login mode', () => {
    component.isSignUp = false
    component.authForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
    })
    mockAuthService.login.mockReturnValue(Promise.resolve({ user: {} }))
    component.onSubmit()
    expect(mockAuthService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    )
  })

  it('should show error message on sign-up failure', async () => {
    component.isSignUp = true
    component.authForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    })
    const error = { message: 'Sign-up failed' }
    mockAuthService.signUp.mockReturnValue(Promise.reject(error))
    await component.onSubmit()
    expect(component.errorMessage).toBe('Signup failed: Sign-up failed')
  })

  it('should show error message on login failure', async () => {
    component.isSignUp = false
    component.authForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
    })
    mockAuthService.login.mockReturnValue(
      Promise.reject({ message: 'Login failed' })
    )
    await component.onSubmit()
    expect(component.errorMessage).toBe('Login failed: Invalid credentials')
  })

  it('should toggle the showPassword boolean', () => {
    expect(component.showPassword).toBeFalsy()
    component.togglePassword()
    expect(component.showPassword).toBeTruthy()
    component.togglePassword()
    expect(component.showPassword).toBeFalsy()
  })
})
