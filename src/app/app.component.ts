import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { User } from './modules/profile/model';
import { ProfileService } from './modules/profile/state/profile.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    authUser$$: Subscription;
    isAuthenticated = false;

    constructor(private auth: AuthService, private profileService: ProfileService) {}

    ngOnInit(): void {
        console.log('App Component');

        this.authUser$$ = this.auth.user$.subscribe((result) => {
            if (result && !this.isAuthenticated) {
                console.log(result);
                this.isAuthenticated = true;
                sessionStorage.setItem('email', result.email);

                const user = {
                    email: result.email,
                    name: result.name,
                    sub: result.sub,
                    nickname: result.nickname,
                    picture: result.picture
                } as User;

                this.profileService.createUser(user).subscribe((res: User) => {
                    sessionStorage.setItem('user_id', res.id);
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.authUser$$.unsubscribe();
    }
}
