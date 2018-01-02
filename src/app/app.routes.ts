import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { MainComponent } from './main/main.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from "./principal/principal.component";
import { VerNoticiaComponent } from "./vernoticia/vernoticia.component";
import { AuthGuard } from "./core/auth/auth-guard.service";
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: '', redirectTo: 'principal', pathMatch: 'full' },
    { path: 'principal', component: PrincipalComponent, pathMatch: 'full' },
    { path: 'noticia', component: NoticiaComponent },
    { path: 'tratamiento/:id', component: TratamientoComponent },
    { path: 'main', component: MainComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'vernoticia/:id', component: VerNoticiaComponent },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
