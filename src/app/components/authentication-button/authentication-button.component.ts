import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styleUrls: ['./authentication-button.component.scss']
})
export class AuthenticationButtonComponent implements OnInit {

  @Input() isAuthenticated: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
