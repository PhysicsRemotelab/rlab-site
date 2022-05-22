import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-temperature-plot',
    templateUrl: './temperature-plot.component.html',
    styleUrls: ['./temperature-plot.component.scss']
})
export class TemperaturePlotComponent implements OnDestroy, OnInit, AfterViewInit {
    constructor(private http: HttpClient) {}

    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private measurementStarted: boolean = false;

    @Input()
    private cameraUrlPixels: string = '';

    @Output()
    measurementDataEvent = new EventEmitter<any>();

    @Output()
    startEvent = new EventEmitter();

    @Output()
    stopEvent = new EventEmitter();

    private chart: Chart;
    private points = [];
    private dataSourceSubscription: Subscription;

    ngAfterViewInit() {
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
                        min: 0,
                        suggestedMax: 320,
                        ticks: {
                            stepSize: 20
                        }
                    },
                    y: {
                        min: 0,
                        max: 255,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }

    ngOnInit() {
        // prevent multiple subscriptions
        if (!this.dataSourceSubscription) {
            this.dataSourceSubscription = interval(2000).subscribe(() => this.updateData());
        }
    }

    private async updateData() {
        let self = this;
        this.http.get(`${this.cameraUrlPixels}/160`).subscribe((data: any) => {
            console.log(data);
            const points = [];
            for (let i = 0; i < data.length; i++) {
                const nr = { x: i, y: Number(data[i]) };
                points.push(nr);
            }
            self.points = points;

            self.chart.data.datasets[0].data = null;
            self.chart.data.datasets[0].data = this.points;
            self.chart.clear();
            self.chart.update();
        });
    }

    private async updateDataLegacy() {
        let self = this;
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = this.cameraUrlPixels;
        const canvas = <HTMLCanvasElement>document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 240;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        img.onload = function () {
            const points = [];
            for (let i = 0; i < 320; i++) {
                const red = context.getImageData(i, 120, 1, 1).data[0];
                const green = context.getImageData(i, 120, 1, 1).data[1];
                const blue = context.getImageData(i, 120, 1, 1).data[2];
                const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
                const nr = { x: i, y: Number(gray) };
                points.push(nr);
            }
            self.points = points;
            // prevent multiple subscriptions
            img.onload = function () {};
        };
        self.chart.data.datasets[0].data = null;
        self.chart.data.datasets[0].data = this.points;
        self.chart.clear();
        self.chart.update();
        console.log(self.points);
    }

    ngOnDestroy(): void {
        if (this.dataSourceSubscription) {
            this.dataSourceSubscription.unsubscribe();
        }
    }
}
