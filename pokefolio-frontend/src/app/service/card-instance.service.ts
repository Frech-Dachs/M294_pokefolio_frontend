import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CardInstance } from '../data/card-instance';

@Injectable({ providedIn: 'root' })
export class CardInstanceService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.backendBaseUrl}cardinstance`;

  getByCollection(collectionId: number) {
    return this.http.get<CardInstance[]>(`${this.baseUrl}/collection/${collectionId}`);
  }

  create(instance: Partial<CardInstance>) {
    return this.http.post<CardInstance>(this.baseUrl, instance);
  }

  update(id: number, instance: Partial<CardInstance>) {
    return this.http.put<CardInstance>(`${this.baseUrl}/${id}`, instance);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
