import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartPoint } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-gamma-plot',
  templateUrl: './gamma-plot.component.html',
  styleUrls: ['./gamma-plot.component.scss']
})
export class GammaPlotComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    @ViewChild('chart2')
    private chartRef: ElementRef;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<ChartPoint[]>();

    private chart: Chart;
    private counts = Array(4095).fill(0);
    private points: ChartPoint[] = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');
    
    constructor() { }

    ngOnInit(): void {
      this.points = this.counts.map((val, i) => {
        const nr = { x: i, y: val };
        return nr;
      });
    }

    ngAfterViewInit(): void {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'scatter',
        data: {
          datasets: [{
            data: this.points,
            fill: true,
            pointRadius: 2
          }]
        },
        options: {
          responsive: true,
          legend: { display: false },
          scales: {
            xAxes: [{ ticks: { min: 0, max: 4095, stepSize: 1000 }}],
            yAxes: [{ ticks: { min: 0, suggestedMax: 10 }}]
          }
        }
      });
    }

    ngOnChanges(): void {
      if (this.measurementStarted) {
        this.subject = webSocket(this.sensorUrl);

        this.dataSourceSubscription = this.subject.pipe(throttleTime(10)).subscribe((point: number) => {
          this.counts[point]++;
          this.transformData();
          this.measurementDataEvent.emit(this.counts);
          this.chart.data.datasets[0].data = null;
          this.chart.data.datasets[0].data = this.points;
          this.chart.clear();
          this.chart.update();
        });
      } else {
        this.dataSourceSubscription.unsubscribe();
      }
    }

    private transformData(): void {
      this.points = this.counts.map((val, i) => {
        const nr = { x: i, y: val };
        return nr;
      });
    }

    returnMeasurementData(value: ChartPoint[]): void {
      this.measurementDataEvent.emit(value);
    }

    ngOnDestroy(): void {
      this.dataSourceSubscription.unsubscribe();
    }

}
