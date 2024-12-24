import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const stored = localStorage.getItem('userData');
    if (stored) {
      this.currentUser.next(JSON.parse(stored));
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  saveUser(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUser.next(user);
  }

  updateUser(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUser.next(user);
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.currentUser.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser.value !== null;
  }
} 