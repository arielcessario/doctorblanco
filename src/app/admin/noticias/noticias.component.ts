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
    selector: 'noticias',
    templateUrl: './noticias.component.html',
    styleUrls: ['./noticias.component.scss']
})

export class NoticiasComponent implements OnInit {
    loged = false;

    noticias: Array<any> = [];
    selectedValue = null;

    // uploader = new FileUploader({ url: `YOUR URL` });

    formNoticia: FormGroup;
    private fb: FormBuilder;

    // Login Form
    public noticia_id: number = 0;

    public titulo: string;
    public detalles: string;
    public detalle_corto: string;
    public foto: string = '';
    public showIndex: boolean = true;
    public showPanel: boolean = false;


    @ViewChild('foto_uploader') foto_uploader;

    private _get;


    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        //this.loged = localStorage.getItem('currentUser') != null;

        this._get = this.dbConnectService.get('noticias', 'getAll', {});

        this._get.subscribe((data) => {
            this.noticias = data;
        });

        this.formNoticia = this.buildForm(this.formNoticia);

    }

    setUp() {

    }

    select(row) {
        this.selectedValue = row;
        this.noticia_id = row.noticia_id;
        this.formNoticia.setValue({ titulo: row.titulo, detalles: row.detalles, detalle_corto: row.detalle_corto });
        this.foto = row.foto;
    }

    save() {
        if (this.noticia_id != 0) {
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
            console.log(data.status);
            if (data.status == 200) {
                this.foto = data.originalName;
                cn = this.dbConnectService.post('noticias', 'create', {
                    titulo: this.formNoticia.get('titulo').value,
                    detalles: this.formNoticia.get('detalles').value,
                    detalle_corto: this.formNoticia.get('detalle_corto').value,
                    foto: this.foto
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.noticias = data;
                        this.index();
                    });
                    this.coreService.setToast({type:'success',title:'Éxito',body:'Salvado con Éxito'});
                })
            }
        });


    }

    update() {
        this.foto_uploader.onSubmit();

        let cn: any;
        this.foto_uploader.status.subscribe((data) => {
            
            if (data.status == 200) {
                this.foto = data.originalName;
                cn = this.dbConnectService.post('noticias', 'update', {
                    noticia_id: this.noticia_id,
                    titulo: this.formNoticia.get('titulo').value,
                    detalles: this.formNoticia.get('detalles').value,
                    detalle_corto: this.formNoticia.get('detalle_corto').value,
                    foto: this.foto
                }).subscribe(response => {
                    this._get.subscribe((data) => {
                        this.noticias = data;
                        this.index();
                    });
                    this.coreService.setToast({type:'success',title:'Éxito',body:'Salvado con Éxito'});
                })
            }
        });
    }

    remove(item){
        this.dbConnectService.post('noticias', 'remove', {noticia_id: item.noticia_id}).subscribe((data)=> {
            this._get.subscribe((data)=> {
                this.noticias = data;
                this.inicilizarVariables();
                this.coreService.setToast({type: 'success', title: 'Éxito', body: 'Salvado con Éxito'});
            })
        })
    }

    inicilizarVariables() {
        this.selectedValue = null;
        this.formNoticia.reset();
        this.noticia_id = 0;
        this.foto = '';
    }

    crear() {
        this.showIndex = false;
        this.showPanel = true;
        this.inicilizarVariables();
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
            'detalle_corto': [this.detalle_corto, [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
        });

        form.valueChanges
            .subscribe(data => this.dbConnectService.onValueChanged(data, form, this.formErrors, this.validationMessages));

        this.dbConnectService.onValueChanged(); // (re)set validation messages now);

        return form;
    }

    formErrors = {
        'titulo': '',
        'detalles': '',
        'detalle_corto': ''
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
        },
        'detalle_corto': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El detalle corto no puede tener mas de 150 letras'
        }
    };

}
