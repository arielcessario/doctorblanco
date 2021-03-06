import { ScrollToModule } from 'ng2-scroll-to';
import { SettingService } from './core/setting.service';

import { NoticiaComponent } from './noticia/noticia.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { MainComponent } from './main/main.component';
import { VerNoticiaComponent } from './vernoticia/vernoticia.component';
import { VerTratamientoComponent } from './vertratamiento/vertratamiento.component';
import { SharedModule } from './shared/shared.module';
import { DbConnectService } from './core/db-connect/db-connect.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PrincipalComponent } from "./principal/principal.component";
import { Routing } from "./app.routes";
import { CoreService } from "./core/core.service";
import { AuthenticationService } from "./core/auth/authentication.service";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AdminModule } from './admin/admin.module';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './core/auth/auth-guard.service';
import { FormsModule } from '@angular/forms';

import { ToasterModule } from 'angular5-toaster';
//import { ToasterModule } from 'angular5-toaster/dist/angular5-toaster';
//import { EscapeHtmlPipe } from './shared/pipes/keep-html.pipe';


@NgModule({
    declarations: [
        AppComponent,
        PrincipalComponent,
        TratamientoComponent,
        NoticiaComponent,
        MainComponent,
        VerNoticiaComponent,
        VerTratamientoComponent
        //EscapeHtmlPipe
    ],
    imports: [
        BrowserModule,
        Angular2FontawesomeModule,
        Routing,
        BrowserAnimationsModule,
        SharedModule,
        AdminModule,
        NgbModule.forRoot(),
        ScrollToModule.forRoot(),
        HttpModule,
        FormsModule,
        ToasterModule
    ],
    providers: [CoreService, AuthenticationService, DbConnectService, AuthGuard, SettingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
