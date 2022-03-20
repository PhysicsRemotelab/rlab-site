import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Input } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Component({
    selector: 'app-temperature-plot',
    templateUrl: './temperature-plot.component.html',
    styleUrls: ['./temperature-plot.component.scss']
})
export class TemperaturePlotComponent implements OnDestroy, AfterViewInit, OnChanges {
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
    private greenPoints = [];
    private redPoints = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');
    cameraUrlForPixels = `${serverUrl}/camera/0`;

    constructor() {}

    ngAfterViewInit(): void {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        data: this.points,
                        fill: true,
                        pointRadius: 2,
                        borderColor: 'black',
                        label: 'Sensor value'
                    },
                    {
                        data: this.redPoints,
                        fill: true,
                        pointRadius: 2,
                        borderColor: 'red',
                        label: 'Red dot pixel value'
                    },
                    {
                        data: this.greenPoints,
                        fill: true,
                        pointRadius: 2,
                        borderColor: 'green',
                        label: 'Green dot pixel value'
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    }

    ngOnChanges() {
        if (this.measurementStarted) {
            this.subject = webSocket(this.sensorUrl);
            this.subject.next({ command: this.selectedSensor });
            this.points = [];
            let i = 0;

            this.dataSourceSubscription = this.subject.pipe(throttleTime(10)).subscribe((point: number) => {
                console.log(point);
                if (point[0] == 0 && point[1] == 0) {
                    this.stopEvent.emit();
                } else {
                    let self = this;
                    this.getPixelValues(function (cameraPoints: any) {
                        let redPoint = cameraPoints[0][0];
                        let greenPoint = cameraPoints[1][0];
                        let sensorPoint = point[0];
                        i++;

                        self.points.push({
                            x: i,
                            y: sensorPoint
                        });
                        self.chart.data.datasets[0].data = null;
                        self.chart.data.datasets[0].data = self.points;
                        self.chart.data.datasets[0].borderColor = 'black';

                        self.redPoints.push({
                            x: i,
                            y: redPoint
                        });
                        self.chart.data.datasets[1].data = null;
                        self.chart.data.datasets[1].data = self.redPoints;
                        self.chart.data.datasets[1].borderColor = 'red';

                        self.greenPoints.push({
                            x: i,
                            y: greenPoint
                        });
                        self.chart.data.datasets[2].data = null;
                        self.chart.data.datasets[2].data = self.greenPoints;
                        self.chart.data.datasets[2].borderColor = 'green';

                        self.measurementDataEvent.emit([i, sensorPoint, redPoint, greenPoint]);
                        self.chart.clear();
                        self.chart.update();
                    });
                }
            });
            return;
        }
        this.subject.complete();
        this.dataSourceSubscription.unsubscribe();
    }

    async getPixelValues(callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = this.cameraUrlForPixels;
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        canvas.width = 320;
        canvas.height = 240;
        const context = canvas.getContext('2d');

        img.onload = function () {
            context.drawImage(img, 0, 0);

            const redPoint = context.getImageData(160, 120, 1, 1).data;
            context.fillStyle = '#FF0000';
            context.beginPath();
            context.arc(160, 120, 3, 0, Math.PI * 2, true);
            context.fill();

            const greenPoint = context.getImageData(160, 160, 1, 1).data;
            context.fillStyle = '#00FF00';
            context.beginPath();
            context.arc(160, 160, 3, 0, Math.PI * 2, true);
            context.fill();

            callback([redPoint, greenPoint]);
        };
    }

    ngOnDestroy(): void {
        this.dataSourceSubscription.unsubscribe();
    }
}
