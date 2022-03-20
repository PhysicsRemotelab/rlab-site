import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.html',
    styleUrls: ['./profile-page.scss']
})
export class ProfilePageComponent implements OnInit {
    constructor(public auth: AuthService) {}

    profileJson: string = null;

    ngOnInit(): void {
        console.log('Profile page');

        this.auth.user$.subscribe((profile) => {
            this.profileJson = JSON.stringify(profile, null, 2);
            console.log(this.profileJson);
        });
    }
}
