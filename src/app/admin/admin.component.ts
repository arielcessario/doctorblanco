import {Component} from '@angular/core';

@Component({
    selector: 'admin-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    title = 'admin';
    estado = 'compacted';
    test = true;

    toggleSideBar() {
        if (this.estado == 'compacted') {
            this.estado = 'expanded';
        } else {
            this.estado = 'compacted';
        }
    }
}
