import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  register(user: User){
    console.log('RegistrationService: ', user);
    this.authService.register(user);
  }
}
