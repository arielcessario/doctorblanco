import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {ProductosComponent} from "./productos/productos.component";
// import {ProductoDetalleComponent} from "./producto-detalle/producto-detalle.component";
// import {CarritoComponent} from "./carrito/carrito.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { AuthGuard } from "../core/auth/auth-guard.service";
import { AdminComponent } from './admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SlideComponent } from './slide/slide.component';
import { NoticiasComponent } from './noticias/noticias.component';
// import {PedidosComponent} from "./pedidos/pedidos.component";
// import {PedidoComponent} from "./pedido/pedido.component";
// import {ContactoComponent} from "./contacto/contacto.component";
// import {DeseosComponent} from "./deseos/deseos.component";
// import {RecoverComponent} from "./recover/recover.component";


const routes: Routes = [
    {
        path: '', component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
            { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
            { path: 'slide', component: SlideComponent, canActivate: [AuthGuard] },
            { path: 'tratamientos', component: TratamientosComponent, canActivate: [AuthGuard] },
            { path: 'noticias', component: NoticiasComponent, canActivate: [AuthGuard] },
            // { path: 'facilities/:id', component: FacilityComponent },
            // { path: 'data-concentrators', component: DataConcentratorsComponent},
            // { path: 'data-concentrators/:id', component: DataConcentratorComponent },
            // { path: '', redirectTo: 'facilities', component: FacilitiesComponent }
        ]
    },

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
