import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
//export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
export class AppComponent implements OnInit {
  title = 'eapp';
  user: string = 'Guest';
  theme: string = 'light';
  version: string = '';

  constructor(private router: Router,) {
    this.version = 'version 1.1.5';
    console.log(this.version);

    if (window.electron) {
      this.electronRecibirParametros();
    }

    console.log("userAA", this.user);

    setTimeout(() => {
      const now = new Date();
      console.log("userAA delay", this.user);
    }, 16000);

    //window.electron.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    //throw new Error('Method not implemented.');
  }

  ngOnInit() {

  }

  electronRecibirParametros() {
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

  /*ngDoCheck() {
    console.log('ngDoCheck');
    console.log("ngDoCheck: userAA", this.user);
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
    console.log("ngAfterContentInit: userAA", this.user);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
    console.log("ngAfterContentChecked: userAA", this.user);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log("ngAfterViewInit: userAA", this.user);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
    console.log("ngAfterViewChecked: userAA", this.user);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }*/

}
