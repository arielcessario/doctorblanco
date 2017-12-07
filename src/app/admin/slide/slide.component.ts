
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

    sliders: Array<any> = [];

    @ViewChild('upload01') upload01;
    @ViewChild('upload02') upload02;
    @ViewChild('upload03') upload03;
    @ViewChild('upload04') upload04;


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
        });

    }

    update() {
        this.upload01.onSubmit();

        this.upload01.status.subscribe((data) => {
            console.log(data);
            if (data.progress.percent == 100) {
                this.upload02.onSubmit();
            }

        });


        this.upload02.status.subscribe((data) => {
            if (data.progress.percent == 100) {
                this.upload03.onSubmit();
            }
        });

        this.upload03.status.subscribe((data) => {
            if (data.progress.percent == 100) {
                this.upload04.onSubmit();
            }
        });

        let cn: any;
        this.upload04.status.subscribe((data) => {
            if (data.progress.percent == 100) {
                cn = this.dbConnectService.post('sliders', 'update',
                    {
                        sliders: [
                            { slider_id: 0, texto: this.slide_01_text, orden: 1, creador_id: 1 },
                            { slider_id: 1, texto: this.slide_02_text, orden: 1, creador_id: 1 },
                            { slider_id: 2, texto: this.slide_03_text, orden: 1, creador_id: 1 },
                            { slider_id: 3, texto: this.slide_04_text, orden: 1, creador_id: 1 },
                        ]
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
