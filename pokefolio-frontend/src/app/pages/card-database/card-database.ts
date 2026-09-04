import { Component, inject, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CreateCardDialog } from '../../components/create-card-dialog/create-card-dialog';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { Card } from '../../data/card';
import { CardService } from '../../service/card.service';

@Component({
  selector: 'app-card-database',
  templateUrl: './card-database.html',
  styleUrl: './card-database.scss',
  imports: [PokemonCard, MatFabButton, MatIcon, RouterLink]
})
export class CardDatabase implements OnInit {
  private dialog = inject(MatDialog);
  private cardService = inject(CardService);

  public cards: Card[] = [];

  ngOnInit(): void {
    this.loadCards();
  }

  private loadCards(): void {
    this.cardService.getAll().subscribe(cards => {
      this.cards = cards;
    });
  }

  public createCard(): void {
    const dialogRef = this.dialog.open(CreateCardDialog, { width: '480px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCards();
      }
    });
  }
}
