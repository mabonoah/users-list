import { NgModule } from '@angular/core';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

const modules: any[] = [
    NgxNavbarModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: []
})
export class ngxBootstrapModule { }
