import { Component } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { IconsComponent } from '../icons/icons.component'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IconsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  authForm: FormGroup
  isSignUp!: boolean
  errorMessage: string = ''
  showPassword: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    })
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp
    if (!this.isSignUp) {
      this.authForm.get('confirmPassword')?.reset()
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched()
      return
    }

    const { email, password, confirmPassword } = this.authForm.value

    if (this.isSignUp) {
      if (password !== confirmPassword) {
        return
      }
      this.authService.signUp(email, password).then(
        () => {
          this.router.navigate(['/home'])
        },
        err => {
          this.errorMessage = `Signup failed: ${err.message}`
        }
      )
    } else {
      this.authService.login(email, password).then(
        () => {
          this.router.navigate(['/home'])
        },
        () => {
          this.errorMessage = `Login failed: Invalid credentials`
        }
      )
    }
  }
}
