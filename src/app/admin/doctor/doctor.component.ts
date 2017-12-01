import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.scss']
})

export class DoctorComponent implements OnInit {
    loged = false;

    uploader = new FileUploader({ url: `YOUR URL` });
    
    constructor() {
    }

    ngOnInit() {

        //this.loged = localStorage.getItem('currentUser') != null;

    }

    setUp() {

    }

}
