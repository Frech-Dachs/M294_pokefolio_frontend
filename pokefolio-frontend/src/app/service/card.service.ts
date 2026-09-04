import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Card } from '../data/card';

export type NewCard = Omit<Card, 'id'>;

@Injectable({ providedIn: 'root' })
export class CardService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.backendBaseUrl}card`;

  getAll() {
    return this.http.get<Card[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Card>(`${this.baseUrl}/${id}`);
  }

  create(card: NewCard) {
    return this.http.post<Card>(this.baseUrl, card);
  }

  update(id: number, card: NewCard) {
    return this.http.put<Card>(`${this.baseUrl}/${id}`, card);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
