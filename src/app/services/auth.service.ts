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
    const sessionIn = JSON.parse(localStorage.getItem('loggedIn'));
    if(sessionIn){
      this.loggedIn.next(sessionIn);
     
    }
    

    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  authenticate(user: User) {
    console.log('user: ', user);
    
    if (user.email === 'admin@admin.com' && user.password === '12345' ) {
      localStorage.setItem('loggedIn', 'true');
      this.loggedIn.next(true);
      this.router.navigate(['/']);
      
    }
  }

  register(user: User ){
    localStorage.setItem('loggedIn', 'true');
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
