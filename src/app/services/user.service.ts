import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<User | null>(this.loadUser());

  private static loadUser(): User | null {
    const stored = localStorage.getItem('userData');
    return stored ? JSON.parse(stored) : null;
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  saveUser(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUser.next(user);
  }

  logout() {
    localStorage.removeItem('userData');
    this.currentUser.next(null);
  }

  isLoggedIn() {
    return this.currentUser.value !== null;
  }
} 