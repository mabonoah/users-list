import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()

export class UsersApiService {
  private mockApiURL = "https://my-json-server.typicode.com/muhammad-a-ali/list-posts/users/";

  constructor(private httpClient: HttpClient) { }


  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.mockApiURL, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.mockApiURL, user, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  public editUser(id: any, user: User): Observable<User> {
    return this.httpClient.put<User>(this.mockApiURL + '/' + id, user, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  public getUser(id: any): Observable<User> {
    return this.httpClient.get<User>(this.mockApiURL + '/' + id, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  public deleteUser(id: any): Observable<User> {
    return this.httpClient.delete<User>(this.mockApiURL + '/' + id, { headers: httpHeaders })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles http error response. 
   * @param error The http error response.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
