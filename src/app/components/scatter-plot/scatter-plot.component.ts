import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { ChartPoint, Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<ChartPoint[]>();

    private chart: Chart;
    private data: ChartPoint[] = [];
    private dataSourceSubscription: Subscription = new Subscription();
    private subject = webSocket('');

    constructor() { }

    ngOnInit(): void {
      console.log('Lab 1 page');
    }

    ngAfterViewInit(): void {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'scatter',
        data: {
          datasets: [{
            data: this.data,
            fill: true,
            pointRadius: 2
          }]
        },
        options: {
          responsive: true,
          legend: { display: false },
          scales: {
            xAxes: [{ ticks: { suggestedMin: 0, suggestedMax: 300 }}],
            yAxes: [{ ticks: { suggestedMin: 0, suggestedMax: 1000 }}]
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

    private transformData(data: any): ChartPoint[] {
      let dataArray: ChartPoint[] = data.split(',');
      dataArray = dataArray.map((val, i) => {
        const nr = { x: i, y: Number(val) };
        this.data.push(nr);
        return nr;
      });

      if (this.data.length > 288) {
        this.data.splice(0, this.data.length - 288);
      }

      return dataArray;
    }

    returnMeasurementData(value: ChartPoint[]): void {
      this.measurementDataEvent.emit(value);
    }

    ngOnDestroy(): void {
      this.dataSourceSubscription.unsubscribe();
    }
}
