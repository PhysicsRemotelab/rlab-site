import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
    selector: 'app-resistance-plot',
    templateUrl: './resistance-plot.component.html',
    styleUrls: ['./resistance-plot.component.scss']
})
export class ResistancePlotComponent implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private selectedSensor: string;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<any>();

    @Output()
    startEvent = new EventEmitter();

    @Output()
    stopEvent = new EventEmitter();

    private chart: Chart;
    private points = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');

    constructor() {}

    ngAfterViewInit(): void {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        data: this.points,
                        fill: false,
                        pointRadius: 1,
                        pointBackgroundColor: 'black',
                        pointBorderColor: 'black',
                        pointHoverBackgroundColor: 'black',
                        pointHoverBorderColor: 'black',
                        label: 'Pixel values'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        min: 20,
                        max: 75,
                        ticks: {
                            stepSize: 5
                        }
                    },
                    y: {
                        min: 0
                    }
                }
            }
        });
    }

    ngOnChanges(): void {
        if (this.measurementStarted) {
            this.subject = webSocket(this.sensorUrl);
            this.subject.next({ command: this.selectedSensor });
            this.points = [];

            this.dataSourceSubscription = this.subject.pipe(throttleTime(10)).subscribe((point: number[]) => {
                console.log(point);
                if (point[0] == 0 && point[1] == 0) {
                    this.stopEvent.emit();
                } else {
                    this.points.push({ x: point[0], y: point[1] });

                    const result = this.points.map((p: any) => [p.x, p.y]);
                    this.measurementDataEvent.emit(result);

                    this.chart.data.datasets[0].data = null;
                    this.chart.data.datasets[0].data = this.points;
                    this.chart.clear();
                    this.chart.update();
                }
            });
            return;
        }
        this.subject.complete();
        this.dataSourceSubscription.unsubscribe();
    }

    ngOnDestroy(): void {
        this.dataSourceSubscription.unsubscribe();
    }
}
