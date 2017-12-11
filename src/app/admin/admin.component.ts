import { Router } from '@angular/router';
import { AuthenticationService } from './../core/auth/authentication.service';
import { CoreService } from './../core/core.service';
import { Component } from '@angular/core';

@Component({
    selector: 'admin-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    title = 'admin';
    estado = 'compacted';
    test = true;

    constructor(private coreService: CoreService, private authenticationService: AuthenticationService, private router: Router) {

    }

    toggleSideBar() {
        if (this.estado == 'compacted') {
            this.estado = 'expanded';
        } else {
            this.estado = 'compacted';
        }
    }

    logOut() {
        this.authenticationService.logout();
        this.coreService.setLoginStatus({ showLogin: false });
        this.router.navigate(['/principal']);
        // this.router.navigate(['/principal']);
        
    }
}
