import { Component, OnInit, SecurityContext, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'tratamiento',
    templateUrl: './tratamiento.component.html',
    styleUrls: ['./tratamiento.component.scss']
})

export class TratamientoComponent implements OnInit {

    id: number;
    titulo: string = '';

    loged = false;
    tratamientos: Array<any> = [];
    //tipo_tratamiento_id: number = 1;


    private _get;

    constructor(private coreService: CoreService, private router: Router, private route: ActivatedRoute,
                private dbConnectService: DbConnectService, private _sanitizer: DomSanitizer,
                private changeDetector: ChangeDetectorRef) {


    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params['id']);
            this.setTitle(params['id']);
            this.id = +params['id'];
            //this.loged = localStorage.getItem('currentUser') != null;
            this._get = this.dbConnectService.get('tratamientos', 'getAll', {});

            this._get.subscribe((data) => {

                let tmp = [];
                for (var index in data) {
                    if(data[index].tipo_tratamiento_id == params['id']) {
                        tmp.push(data[index]);
                    }
                }
                this.tratamientos = tmp;

                console.log(tmp);
                this.changeDetector.markForCheck();

            });
        });
    }


    setTitle(id): void {
        if(id == 1) {
            this.titulo = 'Cirugia Facial';
        } else if(id == 2) {
            this.titulo = 'Cirugia Mamaria';
        } else if(id == 3) {
            this.titulo = 'Cirugia Corporal';
        } else if(id == 4) {
            this.titulo = 'Cirugia Reparadora';
        } else if(id == 5) {
            this.titulo = 'Tratamiento No Quirurgico';
        }
    }

    setUp() {

    }

    htmlProperty(text) : SafeHtml {
        return this._sanitizer.sanitize(SecurityContext.HTML, text);
    }

    showMore(id): void {
        this.router.navigate(['/vertratamiento', id]);
    }

}
