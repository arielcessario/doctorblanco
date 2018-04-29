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

    principal: Array<any> = [];
    selectedValue = null;

    formPrincipal: FormGroup;
    private fb: FormBuilder;

    // uploader = new FileUploader({ url: `YOUR URL` });
    titulo: String = '';
    detalles: String = '';
    foto: String = '';
    principal_id: number = 1;
    public showIndex: boolean = true;
    public showPanel: boolean = false;

    @ViewChild('fotoCtrl') fotoCtrl;

    private _get;

    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        //this.setUp();

        //this.loged = localStorage.getItem('currentUser') != null;

        this._get = this.dbConnectService.get('principal', 'get', {});

        this._get.subscribe((data) => {
            this.principal = data;
        });

        this.formPrincipal = this.buildForm(this.formPrincipal);
    }


    select(row) {
        this.selectedValue = row;
        this.principal_id = row.principal_id;
        this.formPrincipal.setValue({ titulo: row.titulo, detalles: row.detalles });
        this.foto = row.foto;
    }


    setUp(){

    }

    save() {
        this.update();
    }

    update() {
        this.fotoCtrl.onSubmit();

        let cn: any;
        this.fotoCtrl.status.subscribe((data) => {
            if (data.status == 200) {
                this.foto = data.originalName;
                cn = this.dbConnectService.post('principal', 'update', {
                    principal_id: this.principal_id,
                    titulo: this.formPrincipal.get('titulo').value,
                    detalles: this.formPrincipal.get('detalles').value,
                    foto: this.foto
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.principal = data;
                        this.index();
                    });
                    this.coreService.setToast({type:'success',title:'Éxito',body:'Salvado con Éxito'});
                },
                    error => {
                        console.log(error);
                });
            }
        });
    }

    inicilizarVariables() {
        this.selectedValue = null;
        this.formPrincipal.reset();
        this.principal_id = 1;
        this.foto = '';
    }

    modificar(item) {
        this.selectedValue = item;
        this.showIndex = false;
        this.showPanel = true;
    }

    index() {
        this.showIndex = true;
        this.showPanel = false;
        this.inicilizarVariables();
    }

    buildForm(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        form = this.fb.group({
            'titulo': [this.titulo, [Validators.required]],
            'detalles': [this.detalles, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        return form;
    }

    formErrors = {
        'titulo': '',
        'detalles': ''
    };
    validationMessages = {
        'titulo': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 24 letras'
        },
        'detalles': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El detalle no puede tener mas de 4000 letras'
        }
    };


}
