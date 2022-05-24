import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
    selector: 'app-spectrometer-plot',
    templateUrl: './spectrometer-plot.component.html',
    styleUrls: ['./spectrometer-plot.component.scss']
})
export class SpectrometerPlotComponent implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<string>();

    private chart: Chart;
    private chartPoints = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');

    constructor() {}

    ngAfterViewInit(): void {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        data: this.chartPoints,
                        fill: true,
                        backgroundColor: '#D3D3D3',
                        pointRadius: 0.5,
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
                        min: 0,
                        max: 300,
                        ticks: {
                            stepSize: 20
                        },
                        title: {
                            display: true,
                            align: 'center',
                            color: 'black',
                            text: 'Channel number'
                        }
                    },
                    y: {
                        min: 0,
                        max: 1000,
                        ticks: {
                            stepSize: 10
                        },
                        title: {
                            display: true,
                            align: 'center',
                            color: 'black',
                            text: 'Intensity'
                        }
                    }
                }
            }
        });
    }

    ngOnChanges(): void {
        if (this.measurementStarted) {
            this.subject = webSocket(this.sensorUrl);

            this.dataSourceSubscription = this.subject.pipe(throttleTime(100)).subscribe((data: string) => {
                this.transformData(data);
                this.measurementDataEvent.emit(data);
                this.chart.data.datasets[0].data = null;
                this.chart.data.datasets[0].data = this.chartPoints;
                this.chart.clear();
                this.chart.update();
            });
        } else {
            this.dataSourceSubscription.unsubscribe();
        }
    }

    private transformData(data: string) {
        let numbers = data.split(',');
        this.chartPoints = numbers.map((val, i) => {
            const nr = { x: i, y: Number(val) };
            return nr;
        });
    }

    ngOnDestroy(): void {
        this.dataSourceSubscription.unsubscribe();
    }
}
