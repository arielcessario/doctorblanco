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
    selector: 'usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {
    loged = false;

    usuarios: Array<any> = [];

    // uploader = new FileUploader({ url: `YOUR URL` });

    formUsuario: FormGroup;
    private fb: FormBuilder;

    // Login Form
    public mail: string;
    public nombre: string;
    public apellido: string;
    public password: string;
    public rol_id: number;

    private _get;


    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {

        //this.loged = localStorage.getItem('currentUser') != null;

        this._get = this.dbConnectService.get('usuarios', 'getAll', {});

        this._get.subscribe((data) => {
            this.usuarios = data;
        });

        this.formUsuario = this.buildForm(this.formUsuario);

    }

    setUp() {

    }

    create() {

        this.dbConnectService.post('usuarios', 'create', {
            mail: this.formUsuario.get('mail').value,
            nombre: this.formUsuario.get('nombre').value,
            apellido: this.formUsuario.get('apellido').value,
            password: this.formUsuario.get('password').value,
            rol_id: this.formUsuario.get('rol_id').value,
        }).subscribe(response => {
            // this.authService.login(this.formUsuario.get('mail').value, this.formUsuario.get('password').value)
            //     .subscribe(data => {
            //             this.coreService.setLoginStatus({
            //                 showLogin: false
            //             });
            //     });

            this._get.subscribe((data) => {
                this.usuarios = data;
            });

        })
    }

    buildForm(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        form = this.fb.group({
            'mail': [this.mail, [Validators.required, Validators.email]],
            'nombre': [this.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'apellido': [this.apellido, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'password': [this.password, [Validators.required, Validators.minLength(3)]],
            'rol_id': this.rol_id
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        return form;
    }

    formErrors = {
        'mail': '',
        'nombre': '',
        'apellido': '',
        'password': ''
    };
    validationMessages = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 24 letras'
        },
        'apellido': {
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
