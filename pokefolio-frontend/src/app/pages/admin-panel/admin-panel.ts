import { Component, OnInit, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../data/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
  imports: [MatIcon]
})
export class AdminPanel implements OnInit {
  private userService = inject(UserService);

  public users = signal<User[]>([]);
  public isLoading = signal(true);

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: users => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
