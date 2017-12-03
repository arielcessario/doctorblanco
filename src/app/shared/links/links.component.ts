import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
// import {AuthService} from "angular2-social-noticias";
import {Observable} from "rxjs/Observable";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";
// import {ToasterService} from "angular2-toaster";


@Component({
    selector: 'links-component',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})

/**
 * TODO:
 */
export class LinksComponent implements OnInit, AfterViewInit {
    current: number = 1;

    constructor(){};

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

}
