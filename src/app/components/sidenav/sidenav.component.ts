import { Component } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route])
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
