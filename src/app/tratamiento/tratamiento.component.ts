import {Component, OnInit} from '@angular/core';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';

@Component({
    selector: 'tratamiento',
    templateUrl: './tratamiento.component.html',
    styleUrls: ['./tratamiento.component.scss']
})

export class TratamientoComponent implements OnInit {
    loged = false;
    tratamientos: Array<any> = [];


    private _get;

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {
    }

    ngOnInit() {
        //this.loged = localStorage.getItem('currentUser') != null;
        this._get = this.dbConnectService.get('tratamientos', 'getAll', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.tratamientos = data;
        });
    }

    setUp() {

    }

}
