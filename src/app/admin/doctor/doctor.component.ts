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

    formCreateUsuario: FormGroup;
    private fb: FormBuilder;

    // Login Form
    public mail: string;
    public nombre: string;
    public password: string;
    public social_login: number;


    constructor(private coreService: CoreService, private http: Http, 
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {

        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

    buildFormCreate(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        form = this.fb.group({
            'mail': [this.mail, [Validators.required, Validators.email]],
            'nombre': [this.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'password': [this.password, [Validators.required, Validators.minLength(3)]],
            'social_login': this.social_login
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrorsCreate, this.validationMessagesCreate));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        return form;
    }

    formErrorsCreate = {
        'mail': '',
        'nombre': '',
        'password': ''
    };
    validationMessagesCreate = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 24 letras'
        },
        'mail': {
            'required': 'Power is required.',
            'maxlength': 'Sismbolo tiene que tener un máximo de 3 letras'
        },
        'password': {
            'required': 'Debe ingresar un password',
            'minlength': 'El password debe tener al menos tres letras y/o números',
        }
    };

}
