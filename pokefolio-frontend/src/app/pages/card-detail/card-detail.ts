import { Location } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  public card = signal<Card | undefined>(undefined);
  public notFound = signal(false);

  public paragraphs = computed<string[]>(() => {
    const card = this.card();
    if (!card) {
      return [];
    }
    return [
      `Set: ${card.setName} · Nummer ${card.cardNumber} · Rarity: ${card.rarity}`,
      `Typ: ${card.type}${card.hp ? ' · HP: ' + card.hp : ''}`
    ];
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cardId = params.get('cardId') ?? '';
      if (this.cardId) {
        this.cardService.getById(Number(this.cardId)).subscribe({
          next: card => this.card.set(card),
          error: () => this.notFound.set(true)
        });
      }
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
