import { Component, inject, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { PokemonCard as PokemonCardModel } from '../../data/pokemon-card';

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
  public cards: PokemonCardModel[] = [
    { id: '1', name: 'Pikachu', subtitle: 'Base Set · 58/102' },
    { id: '2', name: 'Pikachu', subtitle: 'Jungle · 60/64' },
    { id: '3', name: 'Pikachu', subtitle: 'Team Rocket · 45/82' }
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
