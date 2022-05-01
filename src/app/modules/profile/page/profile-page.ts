import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model';
import { ProfileService } from '../state/profile.service';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.html',
    styleUrls: ['./profile-page.scss']
})
export class ProfilePageComponent implements OnInit {
    constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private snackBarRef: MatSnackBar) {}

    user: User = null;

    nameFormControl = new FormControl('', [Validators.required]);

    profileForm: FormGroup = this.formBuilder.group({
        email: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        code: [null, [Validators.required]]
    });

    ngOnInit(): void {
        console.log('Profile page');
        this.profileService.getProfile().subscribe((user: User) => {
            this.user = user;
            this.profileForm.get('email').setValue(user.email);
            this.profileForm.get('email').disable();
            this.profileForm.get('firstName').setValue(user.firstName);
            this.profileForm.get('lastName').setValue(user.lastName);
            this.profileForm.get('code').setValue(user.code);
        });
    }

    onSubmit() {
        const firstName = this.profileForm.get('firstName').value;
        const lastName = this.profileForm.get('lastName').value;
        const code = this.profileForm.get('code').value;
        this.profileService.updateProfile(code, firstName, lastName).subscribe((res) => {
            console.log(res);

            this.snackBarRef.open('Saved!', 'Hide', {
                duration: 5000,
                verticalPosition: 'top',
                panelClass: ['snackbar']
            });
        });
    }
}
