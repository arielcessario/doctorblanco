import {
    Component,
    OnInit,
    ElementRef,
    ViewChild, Input, AfterViewInit
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CoreService } from "../../core/core.service";
import { DbConnectService } from "../../core/db-connect/db-connect.service";
import { Router } from "@angular/router";

@Component({
    selector: 'contacto-component',
    templateUrl: './contacto.component.html',
    styleUrls: ['./contacto.component.scss']
})

/**
 * TODO:
 */
export class ContactoComponent implements OnInit {
    formContacto: FormGroup;
    //user: any = {};


    public mail: string;
    public nombre: string;
    public asunto: string;
    public lugar: string;
    public mensaje: number;

    formErrors = {
        'mail': '',
        'nombre': '',
        'lugar': '',
        'asungo': '',
        'mensaje': ''
    };
    validationMessages = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 24 letras'
        },
        'mail': {
            'required': 'Requerido',
            'maxlength': 'Debe tener un maximo de 100 caracteres'
        },
        'mensaje': {
            'required': 'Debe ingresar un mensaje',
            'minlength': 'El mensaje debe tener un minimo de 100 caracteres',
        }
    };

    constructor(private coreService: CoreService, private fb: FormBuilder, private db: DbConnectService, private router: Router) {

    }


    ngOnInit() {
        //this.user = (JSON.parse(localStorage.getItem('currentUser')) == null) ? null : JSON.parse(localStorage.getItem('currentUser')).user;
        this.buildForm();
    }

    goTo(link): void {
        this.router.navigate([link]);
        setTimeout(() => {
            this.coreService.refreshAll();
        }, 0);
    }

    buildForm() {
        this.formContacto = this.fb.group({
            'mail': [this.mail, [Validators.required, Validators.email]],
            'nombre': [this.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'lugar': [this.lugar],
            'asunto': [this.asunto],
            'mensaje': [this.mensaje]
        });

        this.formContacto.valueChanges
            .subscribe(data => this.coreService.onValueChanged(data, this.formContacto, this.formErrors, this.validationMessages));

        this.coreService.onValueChanged(); // (re)set validation messages now);


        this.formContacto.setValue({
            //'mail': (this.user != null) ? this.user.mail : '',
            //'nombre': (this.user != null) ? this.user.nombre : '',
            'mail': '',
            'nombre': '',
            'lugar': '',
            'asunto': '',
            'mensaje': ''
        });
    }

    confirmar() {
        let msg = {
            'mail': this.formContacto.controls['mail'].value,
            'nombre': this.formContacto.controls['nombre'].value,
            'lugar': this.formContacto.controls['lugar'].value,
            'asunto': this.formContacto.controls['asunto'].value,
            'mensaje': this.formContacto.controls['mensaje'].value
        };

        this.db.post('mails', 'contacto', msg).subscribe((data) => {
            this.coreService.setToast({ type: 'success', title: 'Mail', body: data });
            this.formContacto.setValue({
                //'mail': (this.user != null) ? this.user.mail : '',
                //'nombre': (this.user != null) ? this.user.nombre : '',
                'mail': '',
                'nombre': '',
                'lugar': '',
                'asunto': '',
                'mensaje': ''
            });
        });
    }


}
