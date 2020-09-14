import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UsersApiService } from '../../services/users-api';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  allUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'country', 'joined_date'];
  dataSource = new MatTableDataSource<User>(this.allUsers);

  constructor(private uersApiService: UsersApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.uersApiService.getAllUsers().subscribe(
      (data: User[]) => {
        this.allUsers = data;
        this.dataSource = new MatTableDataSource<User>(this.allUsers);
      }
    )
  }

}
