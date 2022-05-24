import { NgModule } from '@angular/core';
import { IdleService } from './idle-service';

/**
 *
 * Example use in component:
 *
 * constructor(private idleService: IdleService) {
 *      this.idleService.startWatching(10).subscribe((isIdle: boolean) => (this.bunny = isIdle));
 * }
 */

@NgModule({
    imports: [],
    declarations: [],
    providers: [IdleService],
    exports: []
})
export class IdleModule {}
