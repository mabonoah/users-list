import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/user.service';
import { UsersApiService } from '../../services/users-api';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, AfterViewInit {
  alive: boolean = true;
  displayedColumns: string[] = ['name', 'email', 'country', 'joined_date', 'actions'];
  dataSource = new MatTableDataSource<User>(this.usersService.allUsers);
  addUserSectionHeight: number;
  @ViewChild('addUserSection', { read: ElementRef, static: false }) addUserSection: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostListener('window:resize', ['$event']) onResize() { this.setAddUserSectionHeight(); }

  constructor(
    public usersService: UsersService,
    private usersApiService: UsersApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.onUpdateUsers();
  }

  ngAfterViewInit(): void {
    this.setAddUserSectionHeight();
    this.cdr.detectChanges();
  }

  addNewUser(): void {
    this.router.navigate(['users/add']);
  }

  editUser(id: any): void {
    this.router.navigate(['users/edit', id]);
  }

  viewUser(id: any): void {
    this.router.navigate(['users/view', id]);
  }

  deleteUser(id: any) {
    this.usersApiService.deleteUser(id).pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.usersService.deleteUser(id);
        this.snackBarService.openSnackBar('User has been deleted', 'User')
      }, error => {
        this.snackBarService.openSnackBar(error, 'Error');
      });
  }

  private getAllUsers(): void {
    this.usersApiService.getAllUsers().pipe(takeWhile(() => this.alive)).subscribe(
      (data: User[]) => {
        this.usersService.updateUsers(data);
        this.updateDataSource(data);
      }
    )
  }

  private onUpdateUsers(): void {
    this.usersService.users.pipe(takeWhile(() => this.alive)).subscribe(
      (data: User[]) => {
        this.updateDataSource(data);
      }
    )
  }

  private updateDataSource(data: User[]): void {
    if (!data) return;
    this.dataSource = new MatTableDataSource<User>(data);
    this.dataSource.paginator = this.paginator;
  }

  private setAddUserSectionHeight(): void {
    this.addUserSectionHeight = this.addUserSection.nativeElement.clientHeight;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
