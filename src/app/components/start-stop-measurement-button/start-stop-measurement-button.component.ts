import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-start-stop-measurement-button',
    templateUrl: './start-stop-measurement-button.component.html',
    styleUrls: ['./start-stop-measurement-button.component.scss']
})
export class StartStopMeasurementButtonComponent {
    @Output()
    measurementStartedEvent = new EventEmitter<boolean>();

    @Input()
    stopText: string = 'Stop';

    @Input()
    startText: string = 'Start';

    measurementStarted = false;

    startMeasuremenet(): void {
        this.measurementStartedEvent.emit(true);
        this.measurementStarted = true;
    }

    stopMeasuremenet(): void {
        this.measurementStartedEvent.emit(false);
        this.measurementStarted = false;
    }
}
