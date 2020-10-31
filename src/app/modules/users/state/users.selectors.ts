import { User } from '../model';
import { Injectable } from '@angular/core';
import { UsersState } from './users.reducers';

@Injectable({
    providedIn: 'root'
})
export class UsersSelector {

    getUsers(): any {
        return (state: UsersState): User[] => state.usersReducer.users;
    }
}
