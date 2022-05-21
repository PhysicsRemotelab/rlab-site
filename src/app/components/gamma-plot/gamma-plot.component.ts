import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Component({
    selector: 'app-gamma-plot',
    templateUrl: './gamma-plot.component.html',
    styleUrls: ['./gamma-plot.component.scss']
})
export class GammaPlotComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<number[]>();

    private chart: Chart;
    private result = Array(4095).fill(0);
    private chartPoints = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');

    constructor() {}

    ngOnInit(): void {
        this.chartPoints = this.result.map((val, i) => {
            const nr = { x: i, y: val };
            return nr;
        });
    }

    ngAfterViewInit(): void {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        data: this.chartPoints,
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
                        min: 0,
                        max: 4100
                    }
                }
            }
        });
    }

    ngOnChanges(): void {
        if (this.measurementStarted) {
            this.subject = webSocket(this.sensorUrl);

            this.dataSourceSubscription = this.subject.pipe().subscribe((data: number[]) => {
                this.transformData(data);
                this.measurementDataEvent.emit(this.result);
                this.chart.data.datasets[0].data = null;
                this.chart.data.datasets[0].data = this.chartPoints;
                this.chart.clear();
                this.chart.update();
            });
        } else {
            this.dataSourceSubscription.unsubscribe();
        }
    }

    private transformData(data: number[]): void {
        // Receive new measurement result and add to existing array
        let updatedResult = data.map((p, index) => p + this.result[index]);
        this.result = updatedResult;
        this.chartPoints = this.result.map((val, i) => {
            const nr = { x: i, y: val };
            return nr;
        });
    }

    ngOnDestroy(): void {
        this.dataSourceSubscription.unsubscribe();
    }
}
