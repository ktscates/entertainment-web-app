import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchComponent } from './search.component'

describe('SearchComponent', () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the correct input value when a valid event is passed', () => {
    const event = { target: { value: 'test input' } } as unknown as Event
    const spy = jest.spyOn(component.search, 'emit')
    component.onSearch(event)
    expect(spy).toHaveBeenCalledWith('test input')
  })
})
