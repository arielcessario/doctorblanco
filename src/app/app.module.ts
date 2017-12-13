import { SettingService } from './core/setting.service';

import { NoticiaComponent } from './noticia/noticia.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { MainComponent } from './main/main.component';
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

@NgModule({
    declarations: [
        AppComponent,
        PrincipalComponent,
        TratamientoComponent,
        NoticiaComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        Angular2FontawesomeModule,
        Routing,
        BrowserAnimationsModule,
        SharedModule,
        AdminModule,
        NgbModule.forRoot(),
        HttpModule,
        FormsModule
    ],
    providers: [CoreService, AuthenticationService, DbConnectService, AuthGuard, SettingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
