import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styleUrls: ['./authentication-button.component.scss']
})
export class AuthenticationButtonComponent implements OnInit {

  @Input() isEmailInStorage: boolean;

  constructor(public auth: AuthService) {
    console.log(this.isEmailInStorage);
  }

  ngOnInit(): void {
  }

}
