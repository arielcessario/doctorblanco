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
    selector: 'tratamientos',
    templateUrl: './tratamientos.component.html',
    styleUrls: ['./tratamientos.component.scss']
})

export class TratamientosComponent implements OnInit {
    loged = false;

    tratamientos: Array<any> = [];
    selectedValue = null;

    // uploader = new FileUploader({ url: `YOUR URL` });

    formTratamiento: FormGroup;
    private fb: FormBuilder;

    // Login Form
    public tratamiento_id: number = 0;

    public titulo: string;
    public detalles: string;
    public detalle_corto: string;
    public foto: string = "";
    public tipo_tratamiento_id: number = 1;
    public showIndex: boolean = true;
    public showPanel: boolean = false;


    @ViewChild('foto_uploader') foto_uploader;

    private _get;


    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        //this.loged = localStorage.getItem('currentUser') != null;
        this._get = this.dbConnectService.get('tratamientos', 'getAll', {});

        this._get.subscribe((data) => {
            this.tratamientos = data;
        });

        this.formTratamiento = this.buildForm(this.formTratamiento);
    }

    setUp() {

    }

    select(row) {
        this.selectedValue = row;
        this.tratamiento_id = row.tratamiento_id;
        this.formTratamiento.setValue({ titulo: row.titulo, detalles: row.detalles, tipo_tratamiento_id: row.tipo_tratamiento_id, detalle_corto: row.detalle_corto });
        this.foto = row.foto;
    }

    save() {
        if (this.tratamiento_id != 0) {
            this.update();
        } else {
            this.create();
        }
    }

    // create(): void {
    //     this.toogle = !this.toogle;
    //     console.log(this.toogle);
    // }

    create() {
        this.foto_uploader.onSubmit();

        let cn: any;
        this.foto_uploader.status.subscribe((data) => {
            if (data.status == 200) {
                this.foto = data.originalName;
                cn = this.dbConnectService.post('tratamientos', 'create', {
                    titulo: this.formTratamiento.get('titulo').value,
                    detalles: this.formTratamiento.get('detalles').value,
                    detalle_corto: this.formTratamiento.get('detalle_corto').value,
                    foto: this.foto,
                    tipo_tratamiento_id: this.formTratamiento.get('tipo_tratamiento_id').value
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.tratamientos = data;
                        this.index();
                        this.coreService.setToast({ type: 'success', title: 'Éxito', body: 'Salvado con Éxito' });
                    });

                })
            }
        });

    }


    getTratamientoDescr(index) {
        let t = "";
        switch (index) {
            case 1:
                t = "Cirugia Facial"
                break;
            case 2:
                t = "Cirugia Mamaria"
                break;
            case 3:
                t = "Cirugia Corporal"
                break;
            case 4:
                t = "Cirugia Reparadora"
                break;
            case 5:
                t = "Tratamiento No Quirurgico"
                break;
        }

        return t;
    }


    update() {
        this.foto_uploader.onSubmit();

        let cn: any;
        this.foto_uploader.status.subscribe((data) => {
            if (data.status == 200) {
                this.foto = data.originalName;
                cn = this.dbConnectService.post('tratamientos', 'update', {
                    tratamiento_id: this.tratamiento_id,
                    titulo: this.formTratamiento.get('titulo').value,
                    detalles: this.formTratamiento.get('detalles').value,
                    detalle_corto: this.formTratamiento.get('detalle_corto').value,
                    foto: this.foto,
                    tipo_tratamiento_id: this.formTratamiento.get('tipo_tratamiento_id').value
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.tratamientos = data;
                        this.index();
                    });
                    this.coreService.setToast({ type: 'success', title: 'Éxito', body: 'Salvado con Éxito' });
                })
            }
        });
    }

    remove() {
        if(this.selectedValue == null) {
            this.coreService.setToast({type:'warning',title:'Advertencia',body:'Debe seleccionar un registro'});
        } else {
            this.dbConnectService.post('tratamientos', 'remove', {tratamiento_id: this.tratamiento_id}).subscribe((data) => {
                this._get.subscribe((data) => {
                    this.tratamientos = data;
                    this.inicilizarVariables();
                    this.coreService.setToast({type: 'success', title: 'Éxito', body: 'Salvado con Éxito'});
                })
            })
        }
    }

    inicilizarVariables() {
        this.selectedValue = null;
        this.formTratamiento.reset();
        this.tratamiento_id = 0;
        this.foto = '';
    }

    crear() {
        this.showIndex = false;
        this.showPanel = true;
        this.inicilizarVariables();
    }

    modificar() {
        if(this.selectedValue == null) {
            this.coreService.setToast({type:'warning',title:'Advertencia',body:'Debe seleccionar un registro'});
        } else {
            this.showIndex = false;
            this.showPanel = true;
        }
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
            'detalle_corto': [this.detalle_corto, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'tipo_tratamiento_id': this.tipo_tratamiento_id
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));
            
        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        // this.formTratamiento.setValue({ titulo: "", detalles: "", tipo_tratamiento_id: 1 });
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
            'maxlength': 'El nombre no puede tener mas de 4000 letras'
        },
        'detalle_corto': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 250 letras'
        }
    };

}
