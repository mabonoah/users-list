import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersApiService } from '../../services/users-api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { takeWhile } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UsersService } from '../../services/user.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PostFormComponent implements OnInit {
  alive: boolean = true;
  urlAction: string;
  title = "Add";
  isView: boolean;
  form: FormGroup;
  userId: any;

  constructor(
    private usersService: UsersService,
    private usersApiService: UsersApiService,
    private dialogRef: MatDialogRef<PostFormComponent>,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.onDetectPath();
    this.initForm();
  }

  onSubmit() {
    if (this.form.invalid || this.isView) return;
    this.title == 'Add' ? this.createUser() : this.editUser();
  }

  private onDetectPath(): void {
    const path: string = location.pathname;
    if (path.includes('add')) {
      this.title = 'Add';
    } else if (path.includes('edit')) {
      this.title = 'Edit';
      this.getUser();
    } else {
      this.title = 'View';
      this.isView = true;
      this.getUser();
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imgName': new FormControl('anonymous.png'),
      'email': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'joined_date': new FormControl(null, Validators.required)
    });
  }

  private getUser(): void {
    const splittedPath: string[] = location.pathname.split('/');
    this.userId = splittedPath[splittedPath.length - 1];
    this.usersApiService.getUser(this.userId).pipe(takeWhile(() => this.alive))
      .subscribe((response: any) => {
        this.form.reset(response);
        this.form.controls['joined_date'].setValue(new Date(response.joined_date));
      }, error => {
        this.snackBarService.openSnackBar(error, 'Error');
      })
  }

  private createUser() {
    this.usersApiService.createUser(this.form.value).pipe(takeWhile(() => this.alive))
      .subscribe((response: any) => {
        response.joined_date = new Date(response.joined_date).toDateString();
        this.usersService.addUser(response);
        this.dialogRef.close();
        this.snackBarService.openSnackBar('User has been created', 'User')
      }, error => {
        this.snackBarService.openSnackBar(error, 'Error');
      })
  }

  private editUser() {
    this.usersApiService.editUser(this.userId, this.form.value).pipe(takeWhile(() => this.alive))
      .subscribe((response: any) => {
        response.joined_date = new Date(response.joined_date).toDateString();
        this.usersService.updateUser(response);
        this.dialogRef.close();
        this.snackBarService.openSnackBar('User has been updated', 'User')
      }, error => {
        this.snackBarService.openSnackBar(error, 'Error');
      })
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
