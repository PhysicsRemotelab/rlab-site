import { Component, OnInit } from '@angular/core';
declare var particlesJS: any;

@Component({
    selector: 'app-particles',
    templateUrl: './particles.component.html',
    styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit {
    ngOnInit(): void {
        particlesJS.load('particles-js', 'assets/particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }
}
