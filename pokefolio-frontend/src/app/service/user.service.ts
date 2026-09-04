import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../data/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.backendBaseUrl}admin/users`;

  getAll() {
    return this.http.get<User[]>(this.baseUrl);
  }
}
