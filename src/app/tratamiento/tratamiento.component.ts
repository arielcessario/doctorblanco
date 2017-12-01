import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'tratamiento',
    templateUrl: './tratamiento.component.html',
    styleUrls: ['./tratamiento.component.scss']
})

export class TratamientoComponent implements OnInit {
    loged = false;

    constructor() {
    }

    ngOnInit() {

        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

}
