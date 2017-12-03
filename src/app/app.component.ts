import { Component } from '@angular/core';
import { CoreService } from './core/core.service';
import { DbConnectService } from './core/db-connect/db-connect.service';
import { SettingService } from './core/setting.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    estado = 'compacted';
    test = true;

    // Probar con el producto en el constructor
    constructor(
        // private _ngZone: NgZone,
        private coreService: CoreService,
        private dbConnectService: DbConnectService,
        // private settingService: SettingService,
        // private toasterService: ToasterService
    ) {



        // coreService.showToast.subscribe(toast => {
        //     this.toasterService.pop(toast['type'], toast['title'], toast['body']);
        // });

        // coreService.getLoginStatus.subscribe(data => {
        //     this._ngZone.run(() => {
        //         this.showLogin = data;
        //     });
        // });

        // coreService.getLoadingStatus.subscribe(data => {
        //     setTimeout(() => {
        //         this.showLoading = data.show;
        //     }, 0);
        // })
    }

    toggleSideBar() {
        if (this.estado == 'compacted') {
            this.estado = 'expanded';
        } else {
            this.estado = 'compacted';
        }
    }
}
