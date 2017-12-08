import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
    loged = false;

    constructor() {
    }

    ngOnInit() {

        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

}
