import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { Login } from './login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    constructor(private store: Store<Login>){}

    public loadLogins(){
        this.store.dispatch(LoginActions.loadLogins());
    }

    public addLogin(newLogin: Login){
        this.store.dispatch(
            LoginActions.addLogin({
                newLogin:{...newLogin}
            })
        );
    }
}
