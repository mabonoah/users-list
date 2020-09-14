import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAngularModule } from './material-angular.module';
import { ngxBootstrapModule } from './ngx-bootstrap.module';
import { SpinnerComponent } from '../components/spinner/spinner.component';

const modules: any[] = [CommonModule, MaterialAngularModule, ngxBootstrapModule];

@NgModule({
  declarations: [SpinnerComponent],
  imports: [...modules],
  exports: [
    SpinnerComponent,
    ...modules
  ]
})
export class SharedModule { }
