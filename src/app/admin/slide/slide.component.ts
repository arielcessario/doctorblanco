

import { Http } from '@angular/http';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

    // slide_01 = new FileUploader({ url: './server/upload.php' });
    // slide_02 = new FileUploader({ url: './server/upload.php' });
    // slide_03 = new FileUploader({ url: './server/upload.php' });
    // slide_04 = new FileUploader({ url: './server/upload.php' });


    slide_01_text: String = '';
    slide_02_text: String = '';
    slide_03_text: String = '';
    slide_04_text: String = '';
    slide_01_url: String = '';
    slide_02_url: String = '';
    slide_03_url: String = '';
    slide_04_url: String = '';

    sliders: Array<any> = [];

    @ViewChild('upload01') upload01;
    @ViewChild('upload02') upload02;
    @ViewChild('upload03') upload03;
    @ViewChild('upload04') upload04;

    private toasterService: ToasterService;
    constructor(private coreService: CoreService, private http: Http,
        private dbConnectService: DbConnectService, private authService: AuthenticationService) {


    }

    ngOnInit() {
        this.setUp();

        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

        this.dbConnectService.get('sliders', 'get', {}).subscribe((data) => {
            this.slide_01_text = data[0].texto;
            this.slide_02_text = data[1].texto;
            this.slide_03_text = data[2].texto;
            this.slide_04_text = data[3].texto;
            this.slide_01_url = data[0].path;
            this.slide_02_url = data[1].path;
            this.slide_03_url = data[2].path;
            this.slide_04_url = data[3].path;
        });

    }

    update() {

        let _sliders = [
            { slider_id: 0, texto: this.slide_01_text, path: this.slide_01_url, creador_id: 1, orden: 1 },
            { slider_id: 1, texto: this.slide_02_text, path: this.slide_02_url, creador_id: 1, orden: 1 },
            { slider_id: 2, texto: this.slide_03_text, path: this.slide_03_url, creador_id: 1, orden: 1 },
            { slider_id: 3, texto: this.slide_04_text, path: this.slide_04_url, creador_id: 1, orden: 1 },
        ]

        this.upload01.onSubmit();
        this.upload01.status.subscribe((data) => {
            if (data.status == 200) {
                _sliders[0].path = data.originalName;
                this.upload02.onSubmit();
            }

        });

        this.upload02.status.subscribe((data) => {
            if (data.status == 200) {
                _sliders[1].path = data.originalName;
                this.upload03.onSubmit();
            }
        });

        this.upload03.status.subscribe((data) => {
            if (data.status == 200) {
                _sliders[2].path = data.originalName;
                this.upload04.onSubmit();
            }
        });

        let cn: any;
        this.upload04.status.subscribe((data) => {
            if (data.status == 200) {
                _sliders[3].path = data.originalName;
                cn = this.dbConnectService.post('sliders', 'update',
                    {
                        sliders: _sliders
                    }).subscribe((data) => {
                        this.setUp();
                    });
            }
        });


    }

    status(e) {
        // console.log(e);
    }

}
