import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
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
