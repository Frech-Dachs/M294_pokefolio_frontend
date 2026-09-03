import { Component, inject, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Card } from '../../data/card';
import { CardType } from '../../data/card-type';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { CardInstanceService } from '../../service/card-instance.service';
import { CardInstance } from '../../data/card-instance';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.html',
  styleUrl: './collection-view.scss',
  imports: [PokemonCard, MatFabButton, MatIcon, RouterLink]
})
export class CollectionView implements OnInit {
  private route = inject(ActivatedRoute);
  private cardInstanceService = inject(CardInstanceService);

  public cards: CardInstance[] = [];
  
  public collectionId = '';

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.collectionId = params.get('collectionId') ?? '';
    this.cardInstanceService.getByCollection(Number(this.collectionId)).subscribe(cards => {
      this.cards = cards;
    });
  });
}


  public addCard(): void {
    // TODO(user): open an "add card" dialog / form and persist the new card via the API
  }
}
