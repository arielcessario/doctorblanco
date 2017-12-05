import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
// import {AuthService} from "angular2-social-noticias";
import {Observable} from "rxjs/Observable";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";
// import {ToasterService} from "angular2-toaster";


@Component({
    selector: 'ubicacion-component',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.scss']
})

/**
 * TODO:
 */
export class UbicacionComponent implements OnInit, AfterViewInit {
    current: number = 1;

    constructor(){};

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

}
