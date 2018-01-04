import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";


@Component({
    selector: 'acercade-component',
    templateUrl: './acercade.component.html',
    styleUrls: ['./acercade.component.scss']
})

/**
 * TODO:
 */
export class AcercadeComponent implements OnInit, AfterViewInit {



    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private router: Router){

    };


    ngOnInit() {

    }


    ngAfterViewInit() {

    }


}
