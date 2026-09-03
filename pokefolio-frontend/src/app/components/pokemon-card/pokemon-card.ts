import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
  imports: [MatCard, MatCardContent, MatIcon]
})
export class PokemonCard {
  @Input({ required: true }) name = '';
  @Input() subtitle = '';
  @Input() imageUrl?: string;
}
