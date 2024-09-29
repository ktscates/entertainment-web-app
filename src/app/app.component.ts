import { Component, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { SearchComponent } from './components/search/search.component'
import { AuthComponent } from './components/auth/auth.component'
import { AuthService } from './services/auth/auth.service'
import { Store } from '@ngrx/store'
import { initApp } from './store/actions/bookmark.actions'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, SearchComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'entertainment-web-app'

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.router.navigate(['/home'])
        this.store.dispatch(initApp())
      } else {
        this.router.navigate(['/auth'])
      }
    })
  }
}
