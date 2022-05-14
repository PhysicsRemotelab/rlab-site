import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-materials-page',
    templateUrl: './materials-page.html',
    styleUrls: ['./materials-page.scss']
})
export class MaterialsPageComponent implements OnInit {
    files = [
        {
            id: 1,
            fileName: 'Efficiency of light-emitting diode.pdf',
            location: '/assets/Efficiency of light-emitting diode.pdf'
        },
        {
            id: 2,
            fileName: 'Light spectrum of lamp.pdf',
            location: '/assets/Light spectrum of lamp.pdf'
        },
        {
            id: 3,
            fileName: 'Gamma spectroscopy.pdf',
            location: '/assets/Gamma spectroscopy.pdf'
        },
        {
            id: 4,
            fileName: 'X-Ray Fluorescence spectroscopy.pdf',
            location: '/assets/X-Ray Fluorescence spectroscopy.pdf'
        },
        {
            id: 5,
            fileName: 'Effect of temperature on resistance.pdf',
            location: '/assets/Effect of temperature on resistance.pdf'
        },
        {
            id: 6,
            fileName: 'Diffraction of light.pdf',
            location: '/assets/Diffraction of light.pdf'
        }
    ];

    displayedColumns: string[] = ['id', 'fileName', 'actions'];

    ngOnInit(): void {
        console.log('Materials page');
    }

    downloadFile(location: string) {
        window.location.href = location;
    }
}
