import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from '../state/measurements.services';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Measurement } from '../model';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-measurements-page',
    templateUrl: './measurements-page.html',
    styleUrls: ['./measurements-page.scss']
})
export class MeasurementsPageComponent implements OnInit {
    measurements = [];
    displayedColumns: string[] = ['id', 'lab', 'displayName', 'created', 'actions'];

    constructor(private measurementsService: MeasurementsService, private datepipe: DatePipe, private http: HttpClient) {}

    ngOnInit(): void {
        console.log('Measurements page');
        this.measurementsService.getMeasurements().subscribe((result) => {
            this.measurements = result;
        });
    }

    deleteMeasurement(id: number): void {
        this.measurementsService.deleteMeasurement(id).subscribe((res) => {
            console.log(res);
            this.measurementsService.getMeasurements().subscribe((result) => {
                this.measurements = result;
            });
        });
    }

    downloadSingle(id: number): void {
        const output = this.measurements.filter((item: Measurement) => {
            return [id].indexOf(item.id) !== -1;
        });
        this.download(output);
    }

    downloadFile(id: number, displayName: string): void {
        console.log(id);
        this.measurementsService
            .downloadFile(id)
            .subscribe(blob => {
                const a = document.createElement('a')
                const objectUrl = URL.createObjectURL(blob)
                a.href = objectUrl
                a.download = displayName;
                a.click();
                URL.revokeObjectURL(objectUrl);
            });
    }

    download(output: any): void {
        output = output.map((item: Measurement) => {
            return {
                id: item.id,
                lab: item.lab.name,
                displayName: item.displayName,
                createdAt: this.datepipe.transform(item.createdAt, 'dd.MM.yyyy HH:mm:ss')
            };
        });

        const csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '"',
            title: 'Results',
            headers: ['Measurement ID', 'Lab name', 'File name', 'Created at'],
            eol: '\n'
        };

        new ngxCsv(output, 'Measurements', csvOptions);
    }

    downloadAll(): void {
        this.download(this.measurements);
    }
}
