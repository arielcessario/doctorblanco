import {Component, OnInit} from '@angular/core';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';


@Component({
    selector: 'noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss']
})

export class NoticiaComponent implements OnInit {
    loged = false;
    noticias: Array<any> = [];


    private _get;

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {
    }

    ngOnInit() {
        //this.loged = localStorage.getItem('currentUser') != null;
        this._get = this.dbConnectService.get('noticias', 'getAll', {});

        this._get.subscribe((data) => {
            console.log(data);
            this.noticias = data;
        });
    }

    setUp() {

    }

}
