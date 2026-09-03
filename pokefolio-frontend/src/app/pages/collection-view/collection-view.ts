import { Component, inject, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Card } from '../../data/card';
import { CardType } from '../../data/card-type';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.html',
  styleUrl: './collection-view.scss',
  imports: [PokemonCard, MatFabButton, MatIcon, RouterLink]
})
export class CollectionView implements OnInit {
  private route = inject(ActivatedRoute);

  public collectionId = '';

  // TODO(user): replace mock data with a real call, e.g. CardService.getByCollection(collectionId)
public cards: Card[] = [
  { id: 1, cardType: CardType.POKEMON, name: 'Pikachu', type: 'Electric', hp: 40, rarity: 'Common', setName: 'Base Set', cardNumber: '58/102', imageUrl: '' },
  { id: 2, cardType: CardType.POKEMON, name: 'Pikachu', type: 'Electric', hp: 40, rarity: 'Common', setName: 'Jungle', cardNumber: '60/64', imageUrl: '' },
  { id: 3, cardType: CardType.POKEMON, name: 'Pikachu', type: 'Electric', hp: 40, rarity: 'Common', setName: 'Team Rocket', cardNumber: '45/82', imageUrl: '' }
];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('collectionId') ?? '';
    });
  }

  public addCard(): void {
    // TODO(user): open an "add card" dialog / form and persist the new card via the API
  }
}
