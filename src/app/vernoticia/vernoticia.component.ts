import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'vernoticia',
    templateUrl: './vernoticia.component.html',
    styleUrls: ['./vernoticia.component.scss']
})

export class VerNoticiaComponent implements OnInit {

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
            this._get = this.dbConnectService.get('noticias', 'getAll', {});

            this._get.subscribe((data) => {
                console.log(data);
                for (var index in data) {
                    if(data[index].noticia_id == params['id']) {
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
