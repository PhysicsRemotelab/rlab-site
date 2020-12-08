import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { ChartPoint, Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
  selector: 'app-spectrometer-plot',
  templateUrl: './spectrometer-plot.component.html',
  styleUrls: ['./spectrometer-plot.component.scss']
})
export class SpectrometerPlotComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<ChartPoint[]>();

    private chart: Chart;
    private points: ChartPoint[] = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'scatter',
        data: {
          datasets: [{
            data: this.points,
            fill: true,
            pointRadius: 1
          }]
        },
        options: {
          responsive: true,
          legend: { display: false },
          scales: {
            xAxes: [{ ticks: { min: 0, max: 287 }}],
            yAxes: [{ ticks: { min: 0, max: 1000 }}]
          }
        }
      });
    }

    ngOnChanges(): void {
      if (this.measurementStarted) {
        this.subject = webSocket(this.sensorUrl);

        this.dataSourceSubscription = this.subject.pipe(throttleTime(100)).subscribe((points: ChartPoint[]) => {
          this.transformData(points);
          this.measurementDataEvent.emit(points);
          this.chart.clear();
          this.chart.update();
        });
      } else {
        this.dataSourceSubscription.unsubscribe();
      }
    }

    private transformData(data: any) {
      let dataArray: ChartPoint[] = data.split(',');
    
      dataArray = dataArray.map((val, i) => {
        const nr = { x: i, y: Number(val) };
        if(i !== 288)
          this.points.push(nr);
        return nr;
      });

      if (this.points.length > 287) {
        this.points.splice(0, this.points.length - 287);
      }
    }

    returnMeasurementData(value: ChartPoint[]): void {
      this.measurementDataEvent.emit(value);
    }

    ngOnDestroy(): void {
      this.dataSourceSubscription.unsubscribe();
    }
}
