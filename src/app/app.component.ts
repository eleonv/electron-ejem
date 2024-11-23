import { Component, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

declare global {
    interface Window {
        electron: any;
    }
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'eapp';
    user: string = 'Guest';
    theme: string = 'light';
    version: string = '';

    constructor(private router: Router,) {
        this.version = 'version 1.1.5';

        if (window.electron) {
            this.recibirParametrosDeElectron();
        }

        console.log("userAA", this.user);
    }

    /*ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges');
      //throw new Error('Method not implemented.');
    }
  
    ngOnInit() {
  
    }*/

    recibirParametrosDeElectron() {
        window.electron.receiveParams((params: any) => {
            console.log("params", params);

            if (params.user) {
                this.user = params.user;
            }
            if (params.theme) {
                this.theme = params.theme;
            }

            console.log("user", this.user);
            console.log("theme", this.theme);

            this.router.navigate(['login']);
        });
    }

    accion() { }
}
