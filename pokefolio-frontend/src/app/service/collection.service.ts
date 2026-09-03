import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Collection } from '../data/collection';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.backendBaseUrl}collection`;

  getAll() {
    return this.http.get<Collection[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Collection>(`${this.baseUrl}/${id}`);
  }

  create(name: string) {
    return this.http.post<Collection>(this.baseUrl, { name });
  }

  update(id: number, name: string) {
    return this.http.put<Collection>(`${this.baseUrl}/${id}`, { name });
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
