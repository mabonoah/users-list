import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UsersApiService } from '../../services/users-api';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, AfterViewInit {
  allUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'country', 'joined_date', 'actions'];
  dataSource = new MatTableDataSource<User>(this.allUsers);
  addUserSectionHeight: number;
  @ViewChild('addUserSection', { read: ElementRef, static: false }) addUserSection: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostListener('window:resize', ['$event']) onResize() { this.setAddUserSectionHeight(); }

  constructor(private uersApiService: UsersApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.setAddUserSectionHeight();
    this.cdr.detectChanges();
  }

  getAllUsers(): void {
    this.uersApiService.getAllUsers().subscribe(
      (data: User[]) => {
        this.allUsers = data;
        this.dataSource = new MatTableDataSource<User>(this.allUsers);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  private setAddUserSectionHeight(): void {
    this.addUserSectionHeight = this.addUserSection.nativeElement.clientHeight;
  }

}
