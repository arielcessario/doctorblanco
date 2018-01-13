import { ViewChild } from '@angular/core';
// import { AuthService } from 'angular2-social-login';
import { Http } from '@angular/http';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { FileUploader } from 'ng2-file-upload';
import { CoreService } from '../../core/core.service';
import { DbConnectService } from '../../core/db-connect/db-connect.service';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
    selector: 'doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.scss']
})

export class DoctorComponent implements OnInit {
    loged = false;

    // uploader = new FileUploader({ url: `YOUR URL` });
    titulo: String = '';
    detalles: String = '';
    foto: String = '';

    @ViewChild('fotoCtrl') fotoCtrl;

    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.setUp();

        //this.loged = localStorage.getItem('currentUser') != null;
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
    
    update() {
        console.log(this.titulo);
        console.log(this.detalles);
        this.fotoCtrl.onSubmit();
        let cn: any;
        this.fotoCtrl.status.subscribe((data) => {
            if (data.progress.percent == 100) {
                cn = this.dbConnectService.post('principal', 'update', {
                    titulo: this.titulo,
                    detalles: this.detalles,
                    foto: data.originalName
                }).subscribe((data) => {
                    this.coreService.setToast({type:'success',title:'Éxito',body:'Salvado con Éxito'});
                    this.setUp();
                })
            }
        });

    }

}
