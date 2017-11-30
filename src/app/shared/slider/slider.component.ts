import {
    Component,
    OnInit,
    ElementRef,
    ViewChild
}      from '@angular/core';
import {style, state, animate, transition, trigger} from "@angular/animations";
import {CoreService} from "../../core/core.service";
import {DbConnectService} from "../../core/db-connect/db-connect.service";
import {Router} from "@angular/router";
declare var ga: Function;
@Component({
    selector: 'slider-component',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({opacity: 1}),
                    animate('500ms', style({opacity: 0}))
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
            producto_id: 0,
            nombre: '',
            descripcion: '',
            foto: '',
            precios: [{precio: 0}],
            fotos: [{nombre: 'logo_top.png'}]
        },
        {
            producto_id: 0,
            nombre: '',
            descripcion: '',
            foto: '',
            precios: [{precio: 0}],
            fotos: [{nombre: 'logo_top.png'}]
        },
        {
            producto_id: 0,
            nombre: '',
            descripcion: '',
            foto: '',
            precios: [{precio: 0}],
            fotos: [{nombre: 'logo_top.png'}]
        },
        {
            producto_id: 0,
            nombre: '',
            descripcion: '',
            foto: '',
            precios: [{precio: 0}],
            fotos: [{nombre: 'logo_top.png'}]
        },
        {
            producto_id: 0,
            nombre: '',
            descripcion: '',
            foto: '',
            precios: [{precio: 0}],
            fotos: [{nombre: 'logo_top.png'}]
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

    constructor(private coreService: CoreService, private dbConnectService: DbConnectService, private router: Router) {

    }


    ngOnInit() {

        this.coreService.getProductos.subscribe((productos)=>{
            var leng = productos.length;
            this.items = [];
            while(leng --){
                if(productos[leng]['en_slider']){
                    this.items.push(productos[leng]);
                }
            }

        });



        this.timer = setInterval(() => {
            this.visible = this.visible == 6 ? 1 : this.visible + 1;
        }, 5000);


    }

    interval() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.visible = this.visible == 6 ? 1 : this.visible + 1;
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

        let ret = this.dbConnectService.post('productos', 'desear', {producto_id: item.producto_id});

        ret.subscribe(data=> {
            console.log(data);
        });

        this.coreService.showToast.subscribe(data=> {
            if (data.type == 'error' || data.message.indexOf('Por favor ingrese con su usuario y contraseña')) {
                this.coreService.setLoginStatus({showLogin: true});
                delete item['deseado'];
            }
        });

        // this.coreService.setDesear(item['producto_id']);
    }

    goTo(id): void {
        // console.log('entra');
        // let link = ['/detail', hero.id];
        this.router.navigate(['/producto', id]);
        ga('send', 'event', 'Detalle', '' + id, 'Producto');

        setTimeout(()=> {
            this.coreService.refreshAll();
        }, 0);
    }


}
