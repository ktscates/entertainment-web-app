import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SidenavComponent } from './sidenav.component'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'

class MockAuthService {
  logout = jest.fn()
}

class MockRouter {
  navigate = jest.fn()
}

describe('SidenavComponent', () => {
  let component: SidenavComponent
  let fixture: ComponentFixture<SidenavComponent>
  let mockAuthService: MockAuthService
  let mockRouter: MockRouter

  beforeEach(async () => {
    mockAuthService = new MockAuthService()
    mockRouter = new MockRouter()

    await TestBed.configureTestingModule({
      imports: [SidenavComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SidenavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to the correct route', () => {
    const route = '/test-route'
    component.navigateTo(route)
    expect(mockRouter.navigate).toHaveBeenCalledWith([route])
  })

  it('should call logout and navigate to the home route on logout', () => {
    component.onLogout()
    expect(mockAuthService.logout).toHaveBeenCalled()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/'])
  })
})
