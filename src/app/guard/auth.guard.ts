import { Injectable } from '@angular/core'
import { AuthService } from '../services/auth/auth.service'
import { CanActivate, Router } from '@angular/router'
import { Observable, of, catchError, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          return true
        } else {
          this.router.navigate(['/auth'])
          return false
        }
      }),
      catchError(() => {
        this.router.navigate(['/auth'])
        return of(false)
      })
    )
  }
}
