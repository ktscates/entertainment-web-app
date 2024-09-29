import { Component, Output, EventEmitter } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>()

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value
    console.log('Emitting search:', input) // Add this line

    this.search.emit(input)
  }
}
