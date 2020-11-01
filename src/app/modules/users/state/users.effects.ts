import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UsersService } from './users.services';
import { Action } from '@ngrx/store';
import { GET_USERS, GET_USERS_SUCCESS, POST_USER, POST_USER_SUCCESS } from './users.actions';

@Injectable()
export class UsersEffects {

    getUsers$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(GET_USERS),
        mergeMap(() => this.usersService.getUsers().pipe(
            map(users => ({ type: GET_USERS_SUCCESS, users }))
        ))
    ));

    postUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(POST_USER),
        mergeMap((user) => this.usersService.postUser(user).pipe(
            map(returnedUser => ({ type: POST_USER_SUCCESS, returnedUser }))
        ))
    ));

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

}
