import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  private formSubmitAttempt: boolean;
  
  


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
    /*this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['']
  }, { validator: this.checkPasswords });*/

  this.registrationForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
});
  }

  get f() { return this.registrationForm.controls; }

  isFieldInvalid(field: string) {
    return (
      (!this.registrationForm.get(field).valid && this.registrationForm.get(field).touched) ||
      (this.registrationForm.get(field).untouched && this.formSubmitAttempt)
    );
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.controls.password.value;
  const confirmPass = group.controls.passwordConfirmation.value;
  const validation = pass === confirmPass ? null : { notSame: true };
  console.log('validation: ', validation);
  return validation;
  return true;
}

goLogin(){
    this.router.navigate(['/login']);
  }

onSubmit() {
    console.log('this.registrationForm.valid: ', this.registrationForm.valid);
    console.log('this.registrationForm.errors: ', this.registrationForm.errors);
    if (this.registrationForm.valid) {
        this.registrationService.register(this.registrationForm.value);
      }
    this.formSubmitAttempt = true;
  }

}
