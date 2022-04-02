import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { cameraUrl } from 'src/environments/environment';

@Component({
    selector: 'app-temperature-plot',
    templateUrl: './temperature-plot.component.html',
    styleUrls: ['./temperature-plot.component.scss']
})
export class TemperaturePlotComponent implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private measurementStarted: boolean = false;

    @Output()
    measurementDataEvent = new EventEmitter<any>();

    @Output()
    startEvent = new EventEmitter();

    @Output()
    stopEvent = new EventEmitter();

    private chart: Chart;
    private points = [];
    private dataSourceSubscription: Subscription = new Subscription();

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
                        max: 255,
                    }
                }
            }
        });
    }

    ngOnChanges() {
        console.log('ngOnChanges');
        const source = interval(5000);

        if (!this.measurementStarted) {
            this.dataSourceSubscription.unsubscribe();
            return;
        }

        this.dataSourceSubscription = source.subscribe((point: number) => {
            console.log(point);
            let self = this;
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = `${cameraUrl}/camera/0`;
            const canvas = <HTMLCanvasElement>document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 240;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            img.onload = function () {
                console.log('onload');
                const points = [];
                for (let i = 0; i < 320; i++) {
                    const point = context.getImageData(i, 120, 1, 1).data[0];
                    const nr = { x: i, y: Number(point) };
                    points.push(nr);
                }
                self.points = points;
                self.chart.data.datasets[0].data = null;
                self.chart.data.datasets[0].data = points;
                self.chart.clear();
                self.chart.update();
                console.log(self.points);
            };
        });
    }

    ngOnDestroy(): void {
        this.dataSourceSubscription.unsubscribe();
    }
}
