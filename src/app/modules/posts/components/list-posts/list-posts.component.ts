import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersApiService } from '../../services/users-api';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  allUsers: User[];

  constructor(private uersApiService: UsersApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.uersApiService.getAllUsers().subscribe(
      (data: User[]) => {
        this.allUsers = data;
        console.log(data);
      }
    )
  }

}
