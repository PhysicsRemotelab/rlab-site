import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lab } from '../model';
import { getLabs } from '../state/labs.actions';
import { LabState } from '../state/labs.reducers';
import { getAllLabs } from '../state/labs.selectors';
import { LabsService } from '../state/labs.service';

@Component({
  selector: 'app-labs-page',
  templateUrl: './labs-page.html',
  styleUrls: ['./labs-page.scss']
})
export class LabsPageComponent implements OnInit, OnDestroy {

    labs$: Observable<Lab[]>;
    isAuthenticated = !!sessionStorage.getItem('email');
    currentUserId = sessionStorage.getItem('user_id');
    userEmail = sessionStorage.getItem('email');
    isUsingCurrentLab =  false;

    constructor(
      private store: Store<LabState>,
      private router: Router,
      private labsService: LabsService
    ) { }

    ngOnInit(): void {
      console.log('Labs page');
      this.store.dispatch(getLabs());
      this.labs$ = this.store.select(getAllLabs);
    }

    startlab(lab: Lab): void {
      console.log(lab);
      this.labsService.useLab(lab.id).subscribe(updatedLab => {
        this.router.navigate([`/lab${lab.id}`], { state: { lab: updatedLab } });
      });
    }

    continuelab(lab: Lab): void {
      console.log(lab);
      this.labsService.useLab(lab.id).subscribe(updatedLab => {
        this.router.navigate([`/lab${lab.id}`], { state: { lab: updatedLab } });
      });
    }

    ngOnDestroy(): void {
    }

    isContinueButtonActive(lab: Lab): boolean {
      if (lab.users.length === 0) {
        return false;
      }
      const overTime = new Date(lab.users[0].LabUser.takenUntil) > new Date();
      const currentUser = lab.users[0].LabUser.userId === Number(this.currentUserId);
      return overTime && currentUser && !lab.isDisabled;
    }

    isBusyButtonActive(lab: Lab): boolean {
      if (lab.users.length === 0) {
        return false;
      }
      const overTime = new Date(lab.users[0].LabUser.takenUntil) > new Date();
      const notCurrentUser = lab.users[0].LabUser.userId !== Number(this.currentUserId);
      return overTime && notCurrentUser && !lab.isDisabled;
    }

    isFreeButtonActive(lab: Lab): boolean {
      if (lab.users.length === 0) {
        return true;
      }
      const overTime = new Date(lab.users[0].LabUser.takenUntil) < new Date();
      return overTime && !lab.isDisabled;
    }

    isLabAvailable(lab: Lab): boolean {
      return lab.isDisabled;
    }
}
