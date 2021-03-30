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
    }

    ngOnChanges(): void {
    }

    ngOnDestroy(): void {
    }
}
