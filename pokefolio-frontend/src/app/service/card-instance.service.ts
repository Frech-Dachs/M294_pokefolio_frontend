import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CardInstance } from '../data/card-instance';

export interface CardInstanceInput {
  condition?: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CardInstanceService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.backendBaseUrl}cardinstance`;

  getByCollection(collectionId: number) {
    return this.http.get<CardInstance[]>(`${this.baseUrl}/collection/${collectionId}`);
  }

  getById(id: number) {
    return this.http.get<CardInstance>(`${this.baseUrl}/${id}`);
  }

  addToCollection(collectionId: number, cardId: number, instance: CardInstanceInput) {
    return this.http.post<CardInstance>(`${this.baseUrl}/collection/${collectionId}/card/${cardId}`, instance);
  }

  update(id: number, instance: CardInstanceInput) {
    return this.http.put<CardInstance>(`${this.baseUrl}/${id}`, instance);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
