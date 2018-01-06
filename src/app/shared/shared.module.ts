import { TratamientosPipe } from './pipes/tratamientos.pipe';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from "./producto/producto.component";
import { DescLengthPipe } from "./pipes/desc-length.pipe";
import { SliderComponent } from "./slider/slider.component";
import { CarrouselComponent } from "./carrousel/carrousel.component";
import { VirtualScrollComponent } from "./infinite-scroll/infinite-scroll";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";
import { LoaderComponent } from "./loader/loader.component";
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LinksComponent } from './links/links.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component'
import { AcercadeComponent } from './acercade/acercade.component'
import { ScrollToModule } from 'ng2-scroll-to';
import { UploadComponent } from './upload/upload.component';
import { AnimationsDirective } from './animations/animations.directive';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';


@NgModule({
    declarations: [
        LoginComponent,
        ProductoComponent,
        DescLengthPipe,
        TratamientosPipe,
        SliderComponent,
        CarrouselComponent,
        VirtualScrollComponent,
        AutocompleteComponent,
        NavComponent,
        FooterComponent,
        LoaderComponent,
        TratamientosComponent,
        NoticiasComponent,
        ContactoComponent,
        LinksComponent,
        UbicacionComponent,
        AcercadeComponent,
        UploadComponent,
        AnimationsDirective,
        EscapeHtmlPipe
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ScrollToModule.forRoot()
    ],
    providers: [],
    exports: [
        LoginComponent,
        ProductoComponent,
        DescLengthPipe,
        TratamientosPipe,
        SliderComponent,
        CarrouselComponent,
        VirtualScrollComponent,
        AutocompleteComponent,
        NavComponent,
        FooterComponent,
        LoaderComponent,
        TratamientosComponent,
        NoticiasComponent,
        ContactoComponent,
        LinksComponent,
        UbicacionComponent,
        AcercadeComponent,
        UploadComponent,
        AnimationsDirective
    ]
})
export class SharedModule {
}
