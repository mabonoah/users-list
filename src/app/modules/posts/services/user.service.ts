import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })

export class UsersService {
    allUsers: User[] = [];
    users: Subject<User[]> = new Subject<User[]>();

    updateUsers(users: User[]): void {
        if (!users) return
        this.allUsers = users;
        this.users.next(this.allUsers);
    }

    updateUser(user: User): void {
        if (!user) return;
        const index: number = this.allUsers.findIndex((currentUser: User) => currentUser.id == user.id);
        this.allUsers[index] = user;
        this.users.next(this.allUsers);
    }

    addUser(user: User): void {
        if (!user) return;
        this.allUsers.push(user);
        this.users.next(this.allUsers);
    }

    deleteUser(id: any): void {
        if (!id) return;
        const index: number = this.allUsers.findIndex((user: User) => user.id == id);
        this.allUsers.splice(index, 1);
        this.users.next(this.allUsers);
    }
}