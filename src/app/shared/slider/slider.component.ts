import {
    Component,
    OnInit,
    ElementRef,
    ViewChild
} from '@angular/core';
import { style, state, animate, transition, trigger } from "@angular/animations";
import { CoreService } from "../../core/core.service";
import { DbConnectService } from "../../core/db-connect/db-connect.service";
import { Router } from "@angular/router";
import { log } from 'util';

declare var ga: Function;
@Component({
    selector: 'slider-component',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('500ms', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('500ms', style({ opacity: 0 }))
                ])
            ]
        )
    ]
})

/**
 * TODO:
 */
export class SliderComponent implements OnInit {

    visible: number = 1;
    @ViewChild('tpl') tpl;
    timer: any;

    items: Array<any> = [
        {
            slider_id: 0,
            texto: '',
            orden: '',
            foto: ''
        },
        {
            slider_id: 1,
            texto: '',
            orden: '',
            foto: ''
        },
        {
            slider_id: 2,
            texto: '',
            orden: '',
            foto: ''
        },
        {
            slider_id: 3,
            texto: '',
            orden: '',
            foto: ''
        }
    ];

    frases: Array<string> = [
        'Solo por hoy',
        'Ahora',
        'Última Oportunidad',
        'Apurate!',
        'Pocas unidades',
        'Últimos días',
        '25% de descuento!',
        'Imperdible'
    ];

    sliders: Array<string> = [];

    private _get;

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private router: Router) {

    }


    ngOnInit() {
        this._get = this.dbConnectService.get('sliders', 'get', {});

        this._get.subscribe((data) => {
            this.sliders = data;
            console.log(this.sliders);
        });
        
        var productos = [
            {'en_slider':true, 'src':'http://www.mateomaneff.com.ar/images/slider/slider1.JPG', 'nombre':'Cirugia Plastica y Reparadora', 'descripcion': 'Otorgado por el ministerio de Salud de la Nacion'},
            {'en_slider':true, 'src':'http://www.mateomaneff.com.ar/images/slider/slider2.JPG', 'nombre':'Cirugia Reconstructiva', 'descripcion': ''},
            {'en_slider':true, 'src':'http://www.mateomaneff.com.ar/images/slider/slider3.JPG', 'nombre':'Tratamientos no Quirurgicos', 'descripcion': ''},
            {'en_slider':true, 'src':'http://www.mateomaneff.com.ar/images/slider/slider1.JPG', 'nombre':'Cirugia Mamarias', 'descripcion': ''},
            //{'en_slider':true, 'src':'http://bayresnoproblem.com.ar/images/nueva/test.jpg', 'nombre':'producto 5', 'descripcion': 'prueba de producto 5'},
            //{'en_slider':true, 'src':'http://bayresnoproblem.com.ar/images/nueva/test.jpg', 'nombre':'producto 6', 'descripcion': 'prueba de producto 6'}
        ]
        var leng = 4;

        this.items = [];
        while (leng--) {
            if (productos[leng]['en_slider']) {
                this.items.push(productos[leng]);
            }
        }

        //console.log(this.items);

        this.timer = setInterval(() => {
            this.visible = this.visible == 4 ? 1 : this.visible + 1;
        }, 5000);

    }

    interval() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.visible = this.visible == 4 ? 1 : this.visible + 1;
        }, 5000);
    }

    update(item) {

        if (!item.en_carrito && !item.cantidad) {
            item.cantidad = 1;
        }

        if (item.en_carrito) {
            delete item.en_carrito;
        } else {
            item.en_carrito = true;
            ga('send', 'event', 'Carrito', '' + item.producto_id, 'Producto');
        }

        this.coreService.updateCarrito(item);
    }

    desear(item) {
        if (item['deseado']) {
            delete item['deseado'];
        } else {
            item['deseado'] = true;
            ga('send', 'event', 'Deseo', '' + item.producto_id, 'Producto');
        }

        let ret = this.dbConnectService.post('productos', 'desear', { producto_id: item.producto_id });

        ret.subscribe(data => {
            console.log(data);
        });

        this.coreService.showToast.subscribe(data => {
            if (data.type == 'error' || data.message.indexOf('Por favor ingrese con su usuario y contraseña')) {
                this.coreService.setLoginStatus({ showLogin: true });
                delete item['deseado'];
            }
        });

        // this.coreService.setDesear(item['producto_id']);
    }

    goTo(id): void {
        // console.log('entra');
        // let link = ['/detail', hero.id];
        this.router.navigate(['/institucional']);
        ga('send', 'event', 'Detalle', '' + id, 'Producto');

        setTimeout(() => {
            this.coreService.refreshAll();
        }, 0);
    }


}
