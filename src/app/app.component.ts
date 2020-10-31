import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AppServices } from './app.services';
import { User } from './modules/users/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private appServices: AppServices
  ) {
    this.auth.user$.subscribe(result => {
      console.log(result);
      sessionStorage.setItem('email', result.email);
      sessionStorage.setItem('role', result['https://remotelab.ee/roles']);

      const user = {
        email: result.email,
        name: result.name,
        nickname: result.nickname,
        picture: result.picture
      } as User;

      this.appServices.postUser(user).subscribe((res): any => {
        console.log('post');
        console.log(res);
      });

    });
  }
}
