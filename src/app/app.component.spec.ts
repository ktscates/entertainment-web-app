import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { AuthService } from './services/auth/auth.service'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { initApp } from './store/actions/bookmark.actions'

class MockStore {
  dispatch = jest.fn()
}

class MockAuthService {
  getCurrentUserId = jest.fn().mockReturnValue(of(null))
}

class MockRouter {
  navigate = jest.fn()
}

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let mockAuthService: MockAuthService
  let mockRouter: MockRouter
  let mockStore: MockStore

  beforeEach(async () => {
    mockAuthService = new MockAuthService()
    mockRouter = new MockRouter()
    mockStore = new MockStore()

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it(`should have the 'entertainment-web-app' title`, () => {
    expect(component.title).toEqual('entertainment-web-app')
  })

  it('should navigate to home and dispatch initApp when user is logged in', () => {
    mockAuthService.getCurrentUserId.mockReturnValue(of('userId'))
    component.ngOnInit()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
    expect(mockStore.dispatch).toHaveBeenCalledWith(initApp())
  })

  it('should navigate to auth when user is not logged in', () => {
    mockAuthService.getCurrentUserId.mockReturnValue(of(null))
    component.ngOnInit()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth'])
    expect(mockStore.dispatch).not.toHaveBeenCalled()
  })
})
