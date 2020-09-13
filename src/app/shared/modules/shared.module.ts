import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAngularModule } from './material-angular.module';
import { ngxBootstrapModule } from './ngx-bootstrap.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialAngularModule,
    ngxBootstrapModule
  ],
  exports: [
    CommonModule,
    MaterialAngularModule,
    ngxBootstrapModule
  ]
})
export class SharedModule { }
