import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.scss',
  imports: [MatButton, MatIcon, MatMenuModule]
})
export class UserBadge implements OnInit {
  private authService = inject(AppAuthService);

  public username = '';
  public useralias = '';

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => (this.username = name));
    this.authService.useraliasObservable.subscribe(alias => (this.useralias = alias));
  }

  public get displayName(): string {
    return this.username || this.useralias || 'Gast';
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}
