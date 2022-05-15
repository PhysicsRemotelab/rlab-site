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
            fileName: 'Efficiency of light-emitting diode',
            pdfLocation: '/assets/Efficiency of light-emitting diode.pdf',
            docLocation: '/assets/Efficiency of light-emitting diode.docx'
        },
        {
            id: 2,
            fileName: 'Light spectrum of lamp',
            pdfLocation: '/assets/Light spectrum of lamp.pdf',
            docLocation: '/assets/Light spectrum of lamp.docx'
        },
        {
            id: 3,
            fileName: 'Gamma spectroscopy',
            pdfLocation: '/assets/Gamma spectroscopy.pdf',
            docLocation: '/assets/Gamma spectroscopy.docx'
        },
        {
            id: 4,
            fileName: 'X-Ray Fluorescence spectroscopy',
            pdfLocation: '/assets/X-Ray Fluorescence spectroscopy.pdf',
            docLocation: '/assets/X-Ray Fluorescence spectroscopy.docx'
        },
        {
            id: 5,
            fileName: 'Effect of temperature on resistance',
            pdfLocation: '/assets/Effect of temperature on resistance.pdf',
            docLocation: '/assets/Effect of temperature on resistance.docx'
        },
        {
            id: 6,
            fileName: 'Diffraction of light',
            pdfLocation: '/assets/Diffraction of light.pdf',
            docLocation: '/assets/Diffraction of light.docx'
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
