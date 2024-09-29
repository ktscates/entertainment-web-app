import { Injectable } from '@angular/core'
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: Auth) {}

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  logout() {
    return this.firebaseAuth.signOut()
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable<User | null>(observer => {
      const unsubscribe = onAuthStateChanged(
        this.firebaseAuth,
        (user: User | null | undefined) => {
          observer.next(user)
          observer.complete()
        }
      )
      return unsubscribe
    })
  }
}
