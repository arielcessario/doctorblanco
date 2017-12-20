import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
// import {AuthService} from "angular2-social-noticias";
import {Observable} from "rxjs/Observable";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";
// import {ToasterService} from "angular2-toaster";


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
    //noticias: Array<any> = [];
    titulo_1: String = '';
    detalles_1: String = '';
    foto_1: String = '';
    titulo_2: String = '';
    detalles_2: String = '';
    foto_2: String = '';

    private _get;
    //public getDetalle;

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService){

    };



    // constructor(private coreService: CoreService, private http: Http, public _auth: AuthService,
    //             private dbConnectService: DbConnectService, private authService: AuthenticationService,
    //             private toaster: ToasterService) {
    //     this.coreService.getNoticiasStatus.subscribe(data => {
    //         // console.log(data);
    //     });
    // }
    //
    //
    ngOnInit() {
    //     this.formCreateUsuario = this.buildFormCreate(this.formCreateUsuario);
    //     this.formNoticias = this.buildFormNoticias(this.formNoticias);
    //
    //     this.formCreateUsuario.controls['social_noticias'].setValue(0);

        this._get = this.dbConnectService.get('noticias', 'getAll', {});

        this._get.subscribe((data) => {
            data.sort((a, b) => {
                if(a.fecha > b.fecha)
                    return -1
                else
                    return 1
            });
            //this.noticias = data;
            this.titulo_1 = data[0].titulo;
            this.detalles_1 = data[0].detalles;
            this.foto_1 = data[0].foto;

            this.titulo_2 = data[1].titulo;
            this.detalles_2 = data[1].detalles;
            this.foto_2 = data[1].foto;
        });
    }

    ngAfterViewInit() {

    }

    getDetalle(detalle: string): string {
        if(detalle.length > 250)
            return detalle.substr(0, 250) + "...";
        else
            return detalle;
    }
    //
    // create() {
    //     this.dbConnectService.post('usuarios', 'create', {
    //         mail: this.formCreateUsuario.get('mail').value,
    //         nombre: this.formCreateUsuario.get('nombre').value,
    //         password: this.formCreateUsuario.get('password').value,
    //         social_noticias: this.formCreateUsuario.get('social_noticias').value,
    //     }).subscribe(response => {
    //         this.authService.noticias(this.formCreateUsuario.get('mail').value, this.formCreateUsuario.get('password').value)
    //             .subscribe(data => {
    //                     this.coreService.setNoticiasStatus({
    //                         showNoticias: false
    //                     });
    //             });
    //
    //     })
    // }
    //
    //
    // fnNoticias() {
    //     if (!this.formNoticias.valid) {
    //         return;
    //     }
    //
    //     this.authService.noticias(this.formNoticias.get('mail').value, this.formNoticias.get('password').value)
    //         .subscribe(data => {
    //             this.coreService.setNoticiasStatus({showNoticias: false});
    //         });
    // }
    //
    // signIn(provider) {
    //     this.authService.signIn(provider).subscribe((data: Observable<Object>) => {
    //         data.subscribe(response => {
    //             if (!response['existe']) {
    //                 this.current = 0;
    //                 this.formCreateUsuario.controls['nombre'].setValue(response['nombre']);
    //                 this.formCreateUsuario.controls['mail'].setValue(response['email']);
    //                 this.formCreateUsuario.controls['social_noticias'].setValue(1);
    //                 // this.formCreateUsuario.controls['password'].setValidators(null);
    //                 // this.formCreateUsuario.controls['password'].updateValueAndValidity();
    //                 this.create();
    //             } else {
    //                 this.authService.noticias(response['email'], '')
    //                     .subscribe(data => {
    //                         this.coreService.setNoticiasStatus({
    //                             showNoticias: false
    //                         });
    //                     });
    //             }
    //         });
    //     });
    // }
    //
    // show() {
    //
    //     this.el.nativeElement.type = this.el.nativeElement.type == 'text' ? 'password' : 'text';
    // }
    //
    // close() {
    //     this.coreService.setNoticiasStatus({
    //         showNoticias: false
    //     });
    // }
    //
    // getDeseos() {
    //
    // }
    //
    // logout() {
    //     this.authService.logout();
    // }
    //
    //
    // buildFormCreate(form: FormGroup): FormGroup {
    //
    //     this.fb = new FormBuilder();
    //     form = this.fb.group({
    //         'mail': [this.mail, [Validators.required, Validators.email]],
    //         'nombre': [this.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    //         'password': [this.password, [Validators.required, Validators.minLength(3)]],
    //         'social_noticias': this.social_noticias
    //     });
    //
    //     form.valueChanges
    //         .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrorsCreate, this.validationMessagesCreate));
    //
    //     this.dbConnectService.onValueChanged(); // (re)set validation messages now);
    //
    //     return form;
    // }
    //
    // recover(){
    //
    //     if(!this.formNoticias.get('mail').value){
    //         this.toaster.pop('error', 'Por favor ingrese su mail');
    //         return;
    //     }
    //
    //
    //     this.dbConnectService.post('usuarios', 'generateTemporaryToken', {mail:this.formNoticias.get('mail')
    //         .value}).subscribe((data)=>{
    //         this.toaster.pop('success', 'Se ha enviado un mail con los datos para recuperar su contraseña');
    //     });
    // }
    //
    //
    // buildFormNoticias(form: FormGroup): FormGroup {
    //
    //     this.fb = new FormBuilder();
    //     form = this.fb.group({
    //         'mail': [this.mail, [Validators.required, Validators.email]],
    //         'password': [this.password, [Validators.required, Validators.minLength(1)]]
    //     });
    //
    //     form.valueChanges
    //         .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrorsNoticias, this.validationMessagesNoticias));
    //
    //     this.dbConnectService.onValueChanged(); // (re)set validation messages now);
    //
    //     return form;
    // }
    //
    //
    // formErrorsCreate = {
    //     'mail': '',
    //     'nombre': '',
    //     'password': ''
    // };
    // validationMessagesCreate = {
    //     'nombre': {
    //         'required': 'Requerido',
    //         'minlength': 'Mínimo 3 letras',
    //         'maxlength': 'El nombre no puede tener mas de 24 letras'
    //     },
    //     'mail': {
    //         'required': 'Power is required.',
    //         'maxlength': 'Sismbolo tiene que tener un máximo de 3 letras'
    //     },
    //     'password': {
    //         'required': 'Debe ingresar un password',
    //         'minlength': 'El password debe tener al menos tres letras y/o números',
    //     }
    // };
    // public formErrorsNoticias = {
    //     'mail': '',
    //     'password': '',
    // };
    // validationMessagesNoticias = {
    //     'mail': {
    //         'required': 'Power is required.',
    //         'maxlength': 'Sismbolo tiene que tener un máximo de 3 letras'
    //     },
    //     'password': {
    //         'required': 'Debe ingresar un password',
    //         'minlength': 'El password debe tener al menos tres letras y/o números',
    //     }
    // };


}
