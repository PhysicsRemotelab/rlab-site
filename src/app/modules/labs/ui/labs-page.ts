import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lab } from '../model';
import { getLabs, useLab } from '../state/labs.actions';
import { LabsConfig } from '../state/labs.config';
import { LabState } from '../state/labs.reducers';
import { getAllLabs } from '../state/labs.selectors';

@Component({
  selector: 'app-labs-page',
  templateUrl: './labs-page.html',
  styleUrls: ['./labs-page.scss']
})
export class LabsPageComponent implements OnInit, OnDestroy {

    labs = [];
    labs$: Observable<Lab[]>;

    isAuthenticated = !!sessionStorage.getItem('email');
    currentUserId = sessionStorage.getItem('user_id');
    userEmail = sessionStorage.getItem('email');
    isUsingCurrentLab =  false;

    constructor(
      private store: Store<LabState>,
      private router: Router,
      private http: HttpClient,
      private labsConfig: LabsConfig
    ) { }

    ngOnInit(): void {
      console.log('Labs page');

      this.store.dispatch(getLabs());

      this.labs$ = this.store.select(getAllLabs);

    }

    startlab(id: number): void {
      console.log('start', id);
      this.http.put(this.labsConfig.getUseLabsEndpoint(), {id}).subscribe(result => {
        console.log(result);
      });

      this.router.navigateByUrl(`/lab${id}`);
    }

    continuelab(id: number): void {
      console.log('continue', id);
      this.router.navigateByUrl(`/lab${id}`);
    }

    ngOnDestroy(): void {
    }

}
