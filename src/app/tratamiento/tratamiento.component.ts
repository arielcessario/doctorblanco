import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CoreService } from '../core/core.service';
import { DbConnectService } from '../core/db-connect/db-connect.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'tratamiento',
    templateUrl: './tratamiento.component.html',
    styleUrls: ['./tratamiento.component.scss']
})

export class TratamientoComponent implements OnInit {

    id: number;

    loged = false;
    tratamientos: Array<any> = [];
    tipo_tratamiento_id: number = 1;


    private _get;

    constructor(private coreService: CoreService, private router: Router, private route: ActivatedRoute, private dbConnectService: DbConnectService, private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params['id']);
            this.id = +params['id'];
            //this.loged = localStorage.getItem('currentUser') != null;
            this._get = this.dbConnectService.get('tratamientos', 'getAll', {});

            this._get.subscribe((data) => {
                console.log(data);
                this.tratamientos = data;
            });
        });
    }

    setUp() {

    }

    htmlProperty(text) : SafeHtml {
        return this._sanitizer.sanitize(SecurityContext.HTML, text);
    }

}
