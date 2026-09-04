import { Location } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../data/card';
import { CardInstance } from '../../data/card-instance';
import { CardService } from '../../service/card.service';
import { CardInstanceService } from '../../service/card-instance.service';

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
  private cardInstanceService = inject(CardInstanceService);

  public cardId = '';
  public collectionId = '';
  public card = signal<Card | undefined>(undefined);
  public instances = signal<CardInstance[]>([]);
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

  public totalQuantity = computed(() => this.instances().reduce((sum, instance) => sum + instance.quantity, 0));

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cardId = params.get('cardId') ?? '';
      this.collectionId = params.get('collectionId') ?? '';

      if (!this.cardId) {
        return;
      }

      if (this.collectionId) {
        this.loadInstancesInCollection(Number(this.collectionId), Number(this.cardId));
      } else {
        this.loadCardTemplate(Number(this.cardId));
      }
    });
  }

  private loadCardTemplate(cardId: number): void {
    this.cardService.getById(cardId).subscribe({
      next: card => this.card.set(card),
      error: () => this.notFound.set(true)
    });
  }

  private loadInstancesInCollection(collectionId: number, cardId: number): void {
    this.cardInstanceService.getByCollection(collectionId).subscribe({
      next: instances => {
        const matching = instances.filter(instance => instance.card.id === cardId);
        this.instances.set(matching);
        if (matching.length) {
          this.card.set(matching[0].card);
        } else {
          this.notFound.set(true);
        }
      },
      error: () => this.notFound.set(true)
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
