import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  authenticate(user: User) {
    console.log('user: ', user);
    if (user.email === 'admin@admin.com' && user.password === '12345' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  register(user: User ){
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
