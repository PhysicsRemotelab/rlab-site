import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-authentication-button',
    templateUrl: './authentication-button.component.html',
    styleUrls: ['./authentication-button.component.scss']
})
export class AuthenticationButtonComponent {
    @Input()
    isAuthenticated: boolean = false;

    constructor() {}
}
