import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LoginActions from '../login/store/login/login.actions';
import * as LoginSelectors from '../login/store/login/login.selectors';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginStoreService{
    constructor(private store: Store<User>){}

    public loadLogins(){
        this.store.dispatch(LoginActions.loadLogins());
    }

    public addLogin(newLogin: User){
        this.store.dispatch(
            LoginActions.addLogin({
                newLogin: {...newLogin}
            })
        );
    }

    public getLogin(): Observable<User>{
        return this.store.select(LoginSelectors.getLogin);
    }

    public getEmail$(): Observable<string>{
        return this.store.select(LoginSelectors.getEmail);
    }

    public getPassword$(): Observable<string>{
        return this.store.select(LoginSelectors.getPassword);
    }
}
