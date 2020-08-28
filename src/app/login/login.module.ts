import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from '../registration/registration.component';
import * as LoginReducer from './store/login/login.reducer';
import { AuthService, RegistrationService } from '../services';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login/login.effects';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      LoginReducer.loginFeatureKey,
      LoginReducer.reducer
    ),
    EffectsModule.forFeature([LoginEffects])
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [AuthService, RegistrationService],
})
export class LoginModule { }
