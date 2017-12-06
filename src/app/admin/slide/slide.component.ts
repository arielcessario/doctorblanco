
import { Http } from '@angular/http';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CoreService } from '../../core/core.service';
import { DbConnectService } from '../../core/db-connect/db-connect.service';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
    selector: 'slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss']
})

export class SlideComponent implements OnInit {
    loged = false;

    slide_01 = new FileUploader({ url: `YOUR URL` });
    slide_02 = new FileUploader({ url: `YOUR URL` });
    slide_03 = new FileUploader({ url: `YOUR URL` });
    slide_04 = new FileUploader({ url: `YOUR URL` });


    slide_01_text: String = '';
    slide_02_text: String = '';
    slide_03_text: String = '';
    slide_04_text: String = '';

    sliders: Array<any> = [];


    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {
    }

    ngOnInit() {


        this.dbConnectService.get('sliders', 'get', {}).subscribe((data) => {
            this.slide_01_text = data[0].texto;
            this.slide_02_text = data[1].texto;
            this.slide_03_text = data[2].texto;
            this.slide_04_text = data[3].texto;
        });
        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

    update() {
        this.dbConnectService.post('sliders', 'update',
            {
                sliders: [
                    { slider_id: 0, texto: this.slide_01_text, orden: 1, creador_id: 1 },
                    { slider_id: 1, texto: this.slide_02_text, orden: 1, creador_id: 1 },
                    { slider_id: 2, texto: this.slide_03_text, orden: 1, creador_id: 1 },
                    { slider_id: 3, texto: this.slide_04_text, orden: 1, creador_id: 1 },
                ]
            }).subscribe((data) => {
                this.dbConnectService.get('sliders', 'get', {}).subscribe((data) => {
                    this.slide_01_text = data[0].texto;
                    this.slide_02_text = data[1].texto;
                    this.slide_03_text = data[2].texto;
                    this.slide_04_text = data[3].texto;
                });
            })
    }

}
