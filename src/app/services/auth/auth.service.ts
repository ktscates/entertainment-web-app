import { Injectable } from '@angular/core'
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserId: string | null = null
  currentUser$!: Observable<User | null> // Observable for the current user

  constructor(private firebaseAuth: Auth) {
    this.currentUser$ = new Observable<User | null>(observer => {
      const unsubscribe = onAuthStateChanged(this.firebaseAuth, user => {
        observer.next(user)
      })
      return unsubscribe
    })
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  logout() {
    return this.firebaseAuth.signOut()
  }

  // getCurrentUser(): Observable<User | null> {
  //   return new Observable<User | null>(observer => {
  //     const unsubscribe = onAuthStateChanged(
  //       this.firebaseAuth,
  //       (user: User | null | undefined) => {
  //         console.log('user', user)
  //         observer.next(user)
  //         observer.complete()
  //       }
  //     )
  //     return unsubscribe
  //   })
  // }

  getCurrentUserId(): Observable<string | null> {
    return this.currentUser$.pipe(map(user => (user ? user.uid : null)))
  }
}
