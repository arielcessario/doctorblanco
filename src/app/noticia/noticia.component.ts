import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss']
})

export class NoticiaComponent implements OnInit {
    loged = false;

    constructor() {
    }

    ngOnInit() {

        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

}
