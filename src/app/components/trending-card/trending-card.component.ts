import { Component, Input } from '@angular/core'
import { Movie } from '../../model/model'
import { CommonModule } from '@angular/common'
import { IconsComponent } from '../icons/icons.component'

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [CommonModule, IconsComponent],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.css',
})
export class TrendingCardComponent {
  @Input() movie!: Movie // Assuming Movie model is defined and imported
}
