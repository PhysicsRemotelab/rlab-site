import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe(result => {
      console.log(result);
      sessionStorage.setItem('email', result.email);
      sessionStorage.setItem('role', result['https://remotelab.ee/roles']);
    });
  }
}
