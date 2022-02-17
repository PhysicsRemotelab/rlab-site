import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Lab } from '../model';
import { LabsService } from '../state/labs.service';

@Component({
  selector: 'app-labs-page',
  templateUrl: './labs-page.html',
  styleUrls: ['./labs-page.scss']
})
export class LabsPageComponent implements OnInit, OnDestroy {

    labs: Lab[];
    isAuthenticated = !!sessionStorage.getItem('email');
    currentUserId = sessionStorage.getItem('user_id');
    userEmail = sessionStorage.getItem('email');
    isUsingCurrentLab =  false;

    constructor(
      private router: Router,
      private labsService: LabsService
    ) { }

    ngOnInit(): void {
      console.log('Labs page');
      this.labsService.getLabs().subscribe(labs => {
        console.log(labs);
        this.labs = labs;
        for (let i = 0; i < labs.length; i++) {
          this.labsService.checklabBooking(labs[i].id).subscribe(booking => {
            if (!booking) {
              this.labs[i].status = 'Start';
            }

            if (booking) {
              if (booking.user_id == this.currentUserId)
                this.labs[i].status = 'Continue';
            }

            if (booking) {
              if (booking.user_id != this.currentUserId)
                this.labs[i].status = 'Busy';
            }

          });
        }
      });
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
      return lab.status === 'Continue';
    }

    isBusyButtonActive(lab: Lab): boolean {
      return lab.status === 'Busy';
    }

    isStartButtonActive(lab: Lab): boolean {
      return lab.status === 'Start';
    }

    isLabAvailable(lab: Lab): boolean {
      return lab.isDisabled;
    }
}
