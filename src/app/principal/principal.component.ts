
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit, HostListener } from '@angular/core';


@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss'],
    animations: [
        trigger('animLinks', [
            state('true', style({
                opacity: 1,
                visibility: 'visible'
            })),
            state('false', style({
                opacity: 0,
                visibility: 'collapse'
            })),
            transition('* => *', animate('.9s'))
        ])]
})

export class PrincipalComponent implements OnInit {
    loged = false;
    animLinks = false;
    top: boolean = true;


    constructor() {
    }

    ngOnInit() {
        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

    animation(e) {
        this.animLinks = e;
    }


    @HostListener('window:scroll', ['$event'])
    scroll(event) {
        this.top = window.pageYOffset == 0;
    }

}
