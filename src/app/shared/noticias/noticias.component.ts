import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";


@Component({
    selector: 'noticias-component',
    templateUrl: './noticias.component.html',
    styleUrls: ['./noticias.component.scss']
})

/**
 * TODO:
 */
export class NoticiasComponent implements OnInit, AfterViewInit {

    current: number = 1;
    id: number;

    noticia_1_id: number = 0;
    titulo_1: String = '';
    detalles_1: String = '';
    foto_1: String = '';

    noticia_2_id: number = 0;
    titulo_2: String = '';
    detalles_2: String = '';
    foto_2: String = '';

    private _get;

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private router: Router){

    };


    ngOnInit() {
            this._get = this.dbConnectService.get('noticias', 'getAll', {});

        this._get.subscribe((data) => {
            data.sort((a, b) => {
                if(a.fecha > b.fecha)
                    return -1
                else
                    return 1
            });
            //this.noticias = data;
            this.noticia_1_id = data[0].noticia_id;
            this.titulo_1 = data[0].titulo;
            this.detalles_1 = data[0].detalles;
            this.foto_1 = data[0].foto;

            this.noticia_2_id = data[1].noticia_id;
            this.titulo_2 = data[1].titulo;
            this.detalles_2 = data[1].detalles;
            this.foto_2 = data[1].foto;
        });
    }

    goTo(id): void {
        //console.log(id);
        this.router.navigate(['/vernoticia', id]);
    }

    ngAfterViewInit() {

    }

    getDetalle(detalle: string): string {
        if(detalle.length > 250)
            return detalle.substr(0, 250) + "...";
        else
            return detalle;
    }


}
