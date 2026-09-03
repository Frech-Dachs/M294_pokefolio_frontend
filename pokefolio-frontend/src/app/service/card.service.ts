import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Card } from '../data/card';

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
}
