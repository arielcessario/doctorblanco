import { AuthenticationService } from './../core/auth/authentication.service';
import { CoreService } from './../core/core.service';
import { SharedModule } from './../shared/shared.module';
import { Routing } from './admin.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AdminComponent } from './admin.component';
import { DbConnectService } from '../core/db-connect/db-connect.service';
import { DoctorComponent } from './doctor/doctor.component';
import { QuillModule } from 'ngx-quill';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

@NgModule({
    declarations: [
        AdminComponent,
        DoctorComponent,
        FileDropDirective, 
        FileSelectDirective
    ],
    imports: [
        BrowserModule,
        Angular2FontawesomeModule,
        Routing,
        BrowserAnimationsModule,
        SharedModule,
        QuillModule,
        
    ],
    providers: [CoreService, AuthenticationService, DbConnectService]
})
export class AdminModule {
}
