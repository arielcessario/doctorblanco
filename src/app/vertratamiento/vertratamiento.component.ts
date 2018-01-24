import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'vertratamiento',
    templateUrl: './vertratamiento.component.html',
    styleUrls: ['./vertratamiento.component.scss']
})

export class VerTratamientoComponent implements OnInit {

    id: number;
    titulo: string = '';
    detalle: string = '';
    foto: string = '';

    loged = false;

    private _get;

    constructor(private coreService: CoreService, private router: Router, private route: ActivatedRoute,
                private dbConnectService: DbConnectService, private _sanitizer: DomSanitizer ) {

    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params['id']);
            this.id = params['id'];
            this._get = this.dbConnectService.get('tratamientos', 'getAll', {});

            this._get.subscribe((data) => {
                console.log(data);
                for (var index in data) {
                    if(data[index].tratamiento_id == params['id']) {
                        console.log(data[index]);
                        this.titulo = data[index].titulo;
                        this.detalle = data[index].detalles;
                        this.foto = data[index].foto;
                    }
                }

            });
        });
    }


    setUp() {

    }

    htmlProperty(text) : SafeHtml {
        return this._sanitizer.sanitize(SecurityContext.HTML, text);
    }

}
