import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services';
import { LoginStoreService } from '../services/login-store.service';
import { User } from '../models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    private formSubmitAttempt: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private loginStoreService: LoginStoreService
  ) {  }


  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  goRegistration(){
    this.router.navigate(['/registration']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
        const currentLogin: User = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
        this.loginStoreService.addLogin(currentLogin);
        
        this.authService.authenticate(this.loginForm.value);
      }
    this.formSubmitAttempt = true;
  }

}
