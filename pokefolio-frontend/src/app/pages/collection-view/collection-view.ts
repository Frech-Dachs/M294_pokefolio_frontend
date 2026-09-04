import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddCardInstanceDialog } from '../../components/add-card-instance-dialog/add-card-instance-dialog';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { CardInstance } from '../../data/card-instance';
import { CardInstanceService } from '../../service/card-instance.service';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.html',
  styleUrl: './collection-view.scss',
  imports: [PokemonCard, MatFabButton, MatIcon, RouterLink]
})
export class CollectionView implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private cardInstanceService = inject(CardInstanceService);

  public collectionId = '';
  public cards = signal<CardInstance[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('collectionId') ?? '';
      this.loadCards();
    });
  }

  private loadCards(): void {
    this.cardInstanceService.getByCollection(Number(this.collectionId)).subscribe(cards => {
      this.cards.set(cards);
    });
  }

  public addCard(): void {
    const dialogRef = this.dialog.open(AddCardInstanceDialog, {
      width: '480px',
      data: { collectionId: Number(this.collectionId) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCards();
      }
    });
  }
}
