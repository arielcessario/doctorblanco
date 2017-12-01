import { SharedModule } from './shared/shared.module';
import { DbConnectService } from './core/db-connect/db-connect.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PrincipalComponent } from "./principal/principal.component";
import { Routing } from "./app.routes";
import { CoreService } from "./core/core.service";
import { AuthenticationService } from "./core/auth/authentication.service";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        PrincipalComponent
    ],
    imports: [
        BrowserModule,
        Angular2FontawesomeModule,
        Routing,
        BrowserAnimationsModule,
        SharedModule,
    ],
    providers: [CoreService, AuthenticationService, DbConnectService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
