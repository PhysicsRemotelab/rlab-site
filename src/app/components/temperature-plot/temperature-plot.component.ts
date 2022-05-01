import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { Input } from '@angular/core';

@Component({
    selector: 'app-temperature-plot',
    templateUrl: './temperature-plot.component.html',
    styleUrls: ['./temperature-plot.component.scss']
})
export class TemperaturePlotComponent implements OnDestroy, OnInit, AfterViewInit {
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
                        max: 320
                    },
                    y: {
                        min: 0,
                        max: 255
                    }
                }
            }
        });
    }

    ngOnInit() {
        // prevent multiple subscriptions
        if (!this.dataSourceSubscription) {
            this.dataSourceSubscription = interval(5000).subscribe(() => this.updateData());
        }
    }

    private async updateData() {
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
                const point = context.getImageData(i, 120, 1, 1).data[0];
                const nr = { x: i, y: Number(point) };
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
