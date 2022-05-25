import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-gamma-plot',
    templateUrl: './gamma-plot.component.html',
    styleUrls: ['./gamma-plot.component.scss']
})
export class GammaPlotComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private result: number[];

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<number[]>();

    private chart: Chart;
    private chartPoints = [];
    public lastUpdated = new Date();
    public totalCounts = 0;

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
                        fill: true,
                        backgroundColor: '#D3D3D3',
                        pointRadius: 0.5,
                        pointBackgroundColor: 'black',
                        pointBorderColor: 'black',
                        pointHoverBackgroundColor: 'black',
                        pointHoverBorderColor: 'black',
                        label: 'Energy distribution of counted photons'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        min: 0,
                        max: 4100,
                        ticks: {
                            stepSize: 50
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
                        suggestedMax: 100,
                        title: {
                            display: true,
                            align: 'center',
                            color: 'black',
                            text: 'Counts'
                        }
                    }
                }
            }
        });
    }

    ngOnChanges(): void {
        if (this.measurementStarted && this.chart) {
            this.transformData(this.result);
            this.chart.data.datasets[0].data = null;
            this.chart.data.datasets[0].data = this.chartPoints;
            this.chart.clear();
            this.chart.update();
        }
    }

    private transformData(data: number[]): void {
        // Receive new measurement result and add to existing array
        this.result = data;
        this.lastUpdated = new Date();
        this.totalCounts = data.reduce((a, b) => a + b, 0);
        this.chartPoints = this.result.map((val, i) => {
            const nr = { x: i, y: val };
            return nr;
        });
    }
}
