import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { User } from './modules/users/model';
import { roles } from '../../src/environments/environment';
import { UsersService } from './modules/users/state/users.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  authUser$$: Subscription;
  isAuthenticated = !!sessionStorage.getItem('email');

  constructor(
    private auth: AuthService,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    console.log('App Component');
  
    this.authUser$$ = this.auth.user$.subscribe(result => {
      if(result) {
        console.log(result);
        this.isAuthenticated = true;
        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('role', result[roles]);
  
        const user = {
          email: result.email,
          name: result.name,
          sub: result.sub,
          roles: result[roles].join(),
          nickname: result.nickname,
          picture: result.picture
        } as User;
  
        this.usersService.postUser(user).subscribe((res: User) => {
          sessionStorage.setItem('user_id', res.id);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.authUser$$.unsubscribe();
  }
}
