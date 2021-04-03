import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { ChartPoint, Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
  selector: 'app-resistance-plot',
  templateUrl: './resistance-plot.component.html',
  styleUrls: ['./resistance-plot.component.scss']
})
export class ResistancePlotComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    @ViewChild('chart')
    private chartRef: ElementRef;

    @Input()
    private selectedSensor: string;

    @Input()
    private sensorUrl: string;

    @Input()
    private measurementStarted: string;

    @Output()
    measurementDataEvent = new EventEmitter<ChartPoint[]>();

    @Output()
    stopMeasurementEvent = new EventEmitter();

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
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          legend: { display: false },
          scales: {
            xAxes: [{ ticks: { min: 20, max: 80 }}]
          }
        }
      });
    }

    ngOnChanges(): void {
      if(this.measurementStarted) {
        this.subject = webSocket(this.sensorUrl);
        this.subject.next({ command: this.selectedSensor });
        this.points = [];

        this.dataSourceSubscription = this.subject.pipe(throttleTime(10)).subscribe((point: number) => {
          console.log(point);
          if (point[0] == 0 && point[1] == 0) {
            this.stopMeasurementEvent.emit();
          } else {
            this.points.push({
              x: point[0],
              y: point[1]
            });
            this.measurementDataEvent.emit(this.points);
            this.chart.data.datasets[0].data = null;
            this.chart.data.datasets[0].data = this.points;
            this.chart.clear();
            this.chart.update();
          }
        });
        return;
      }
      this.subject.next({ command: 'stop' });
      this.subject.complete();
      this.dataSourceSubscription.unsubscribe();
    }

    returnMeasurementData(value: ChartPoint[]): void {
      this.measurementDataEvent.emit(value);
    }

    ngOnDestroy(): void {
      this.dataSourceSubscription.unsubscribe();
    }
}
