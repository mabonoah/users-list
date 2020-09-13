import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()

export class UsersApiService {
  private mockApiURL = "http://localhost:3000/users/";

  constructor(private httpClient: HttpClient) { }


  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.mockApiURL, { headers: httpHeaders });
  }


}
