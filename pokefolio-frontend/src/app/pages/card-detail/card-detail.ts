import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../data/card';
import { CardService } from '../../service/card.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss',
  imports: [MatIconButton, MatIcon]
})
export class CardDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private cardService = inject(CardService);

  public cardId = '';
  public card?: Card;
  public notFound = false;

  public get paragraphs(): string[] {
    if (!this.card) {
      return [];
    }
    return [
      `Set: ${this.card.setName} · Nummer ${this.card.cardNumber} · Rarity: ${this.card.rarity}`,
      `Typ: ${this.card.type}${this.card.hp ? ' · HP: ' + this.card.hp : ''}`
    ];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cardId = params.get('cardId') ?? '';
      if (this.cardId) {
        this.cardService.getById(Number(this.cardId)).subscribe({
          next: card => (this.card = card),
          error: () => (this.notFound = true)
        });
      }
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
