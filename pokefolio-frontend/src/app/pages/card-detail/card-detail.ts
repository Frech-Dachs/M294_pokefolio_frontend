import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss',
  imports: [MatIconButton, MatIcon]
})
export class CardDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  public cardId = '';

  // TODO(user): replace mock data with a real call, e.g. CardService.getById(cardId)
  public name = 'Pikachu';
  public imageUrl?: string;
  public paragraphs: string[] = [
    'Set: Base Set · Nummer 58/102 · Rarity: Common',
    'Zustand: Near Mint. Erworben am 12.03.2024 im Booster-Pack.',
    'Notizen: Lieblingskarte der Sammlung – wird nicht zum Verkauf angeboten.'
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cardId = params.get('cardId') ?? '';
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
