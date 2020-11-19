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
      this.router.navigate([`/lab${lab.id}`], { state: { lab } });
    }

    ngOnDestroy(): void {
    }

    isContinueButtonActive(lab: Lab): boolean {
      const overTime = new Date(lab.takenUntil) > new Date();
      return overTime && lab.userId === Number(this.currentUserId);
    }

    isBusyButtonActive(lab: Lab): boolean {
      const overTime = new Date(lab.takenUntil) > new Date();
      const notCurrentUser = lab.userId && lab.userId !== Number(this.currentUserId);
      return overTime && notCurrentUser;
    }

    isFreeButtonActive(lab: Lab): boolean {
      const overTime = new Date(lab.takenUntil) < new Date();
      return overTime || !lab.userId;
    }

}
