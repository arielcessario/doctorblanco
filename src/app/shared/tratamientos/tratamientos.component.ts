import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
// import {AuthService} from "angular2-social-tratamientos";
import {Observable} from "rxjs/Observable";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";
// import {ToasterService} from "angular2-toaster";


@Component({
    selector: 'tratamientos-component',
    templateUrl: './tratamientos.component.html',
    styleUrls: ['./tratamientos.component.scss']
})

/**
 * TODO:
 */
export class TratamientosComponent implements OnInit, AfterViewInit {
    current: number = 1;




    constructor(private dbConnectService: DbConnectService){

    };
    // constructor(private coreService: CoreService, private http: Http, public _auth: AuthService,
    //             private dbConnectService: DbConnectService, private authService: AuthenticationService,
    //             private toaster: ToasterService) {
    //     this.coreService.getTratamientosStatus.subscribe(data => {
    //         // console.log(data);
    //     });
    // }
    //
    //
    ngOnInit() {
        this.dbConnectService.get('tratamientos','getAll', {}).subscribe((data)=>{
            console.log(data);
        });
    //     this.formCreateUsuario = this.buildFormCreate(this.formCreateUsuario);
    //     this.formTratamientos = this.buildFormTratamientos(this.formTratamientos);
    //
    //     this.formCreateUsuario.controls['social_tratamientos'].setValue(0);
    }

    ngAfterViewInit() {

    }
    //
    // create() {
    //     this.dbConnectService.post('usuarios', 'create', {
    //         mail: this.formCreateUsuario.get('mail').value,
    //         nombre: this.formCreateUsuario.get('nombre').value,
    //         password: this.formCreateUsuario.get('password').value,
    //         social_tratamientos: this.formCreateUsuario.get('social_tratamientos').value,
    //     }).subscribe(response => {
    //         this.authService.tratamientos(this.formCreateUsuario.get('mail').value, this.formCreateUsuario.get('password').value)
    //             .subscribe(data => {
    //                     this.coreService.setTratamientosStatus({
    //                         showTratamientos: false
    //                     });
    //             });
    //
    //     })
    // }
    //
    //
    // fnTratamientos() {
    //     if (!this.formTratamientos.valid) {
    //         return;
    //     }
    //
    //     this.authService.tratamientos(this.formTratamientos.get('mail').value, this.formTratamientos.get('password').value)
    //         .subscribe(data => {
    //             this.coreService.setTratamientosStatus({showTratamientos: false});
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
    //                 this.formCreateUsuario.controls['social_tratamientos'].setValue(1);
    //                 // this.formCreateUsuario.controls['password'].setValidators(null);
    //                 // this.formCreateUsuario.controls['password'].updateValueAndValidity();
    //                 this.create();
    //             } else {
    //                 this.authService.tratamientos(response['email'], '')
    //                     .subscribe(data => {
    //                         this.coreService.setTratamientosStatus({
    //                             showTratamientos: false
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
    //     this.coreService.setTratamientosStatus({
    //         showTratamientos: false
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
    //         'social_tratamientos': this.social_tratamientos
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
    //     if(!this.formTratamientos.get('mail').value){
    //         this.toaster.pop('error', 'Por favor ingrese su mail');
    //         return;
    //     }
    //
    //
    //     this.dbConnectService.post('usuarios', 'generateTemporaryToken', {mail:this.formTratamientos.get('mail')
    //         .value}).subscribe((data)=>{
    //         this.toaster.pop('success', 'Se ha enviado un mail con los datos para recuperar su contraseña');
    //     });
    // }
    //
    //
    // buildFormTratamientos(form: FormGroup): FormGroup {
    //
    //     this.fb = new FormBuilder();
    //     form = this.fb.group({
    //         'mail': [this.mail, [Validators.required, Validators.email]],
    //         'password': [this.password, [Validators.required, Validators.minLength(1)]]
    //     });
    //
    //     form.valueChanges
    //         .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrorsTratamientos, this.validationMessagesTratamientos));
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
    // public formErrorsTratamientos = {
    //     'mail': '',
    //     'password': '',
    // };
    // validationMessagesTratamientos = {
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
