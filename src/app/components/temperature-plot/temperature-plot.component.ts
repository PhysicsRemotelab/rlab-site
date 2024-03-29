import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { CameraPixelService } from './temperature.service';

@Component({
    selector: 'app-temperature-plot',
    templateUrl: './temperature-plot.component.html',
    styleUrls: ['./temperature-plot.component.scss']
})
export class TemperaturePlotComponent implements OnDestroy, OnInit, AfterViewInit {
    constructor(private cameraPixelService: CameraPixelService) {}

    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private measurementStarted: boolean = false;

    @Input()
    private lineNumber: number = 0;

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
                        fill: true,
                        backgroundColor: '#D3D3D3',
                        pointRadius: 0.5,
                        pointBackgroundColor: 'black',
                        pointBorderColor: 'black',
                        pointHoverBackgroundColor: 'black',
                        pointHoverBorderColor: 'black',
                        label: 'Grayscale pixel values at horizontal line of image'
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
                        },
                        title: {
                            display: true,
                            align: 'center',
                            color: 'black',
                            text: 'Width (pixels)'
                        }
                    },
                    y: {
                        min: 0,
                        max: 255,
                        ticks: {
                            stepSize: 5
                        },
                        title: {
                            display: true,
                            align: 'center',
                            color: 'black',
                            text: 'Intensity (pixels)'
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
        this.cameraPixelService.getCameraPixels(this.cameraUrlPixels, this.lineNumber).subscribe((data: any) => {
            console.log(data);
            this.measurementDataEvent.emit(data);
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

    ngOnDestroy(): void {
        if (this.dataSourceSubscription) {
            this.dataSourceSubscription.unsubscribe();
        }
    }
}
