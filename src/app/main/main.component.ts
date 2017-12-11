import {Component, OnInit} from '@angular/core';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';


@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
    loged = false;
    titulo: String = '';
    detalles: String = '';
    foto: String = '';


    constructor(private coreService: CoreService, private dbConnectService: DbConnectService) {
    }

    ngOnInit() {
        //this.loged = localStorage.getItem('currentUser') != null;
        this.setUp();
    }

    setUp(){
        this.dbConnectService.get('principal', 'get', {}).subscribe((data) => {
            if (data[0] == undefined) {
                this.titulo = '';
                this.detalles = '';
                this.foto = '';
            } else {
                this.titulo = data[0].titulo;
                this.detalles = data[0].detalles;
                this.foto = data[0].foto;
            }
        });
    }

}
