import { Component } from '@angular/core';
import { IdleService } from '../../services/idle-service/idle-service';

@Component({
    selector: 'app-bunny',
    templateUrl: './bunny.component.html',
    styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent {
    bunny = false;

    constructor(private idleService: IdleService) {
        this.idleService.startWatching(10).subscribe((isIdle: boolean) => (this.bunny = isIdle));
    }
}
