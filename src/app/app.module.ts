import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Routing} from "./app.routes";
import {NavComponent} from "./shared/nav/nav.component";
import {CoreService} from "./core/core.service";
import {AuthenticationService} from "./core/auth/authentication.service";
import {Angular2FontawesomeModule} from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        Angular2FontawesomeModule,
        Routing
    ],
    providers: [CoreService, AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
