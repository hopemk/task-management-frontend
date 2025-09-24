import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterRequest, RegisterSuccessResponse } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  baseUrl = environment.baseUrl;
  private userFullUrl = this.baseUrl + '/auth/register';

  constructor(private http: HttpClient) { }

  register(payload: RegisterRequest): Observable<RegisterSuccessResponse> {
    const url = `${this.userFullUrl}`;
    return this.http.post<RegisterSuccessResponse>(url, payload).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
