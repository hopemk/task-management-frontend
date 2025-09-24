import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginSuccessResponse } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token');
  }

  login(username: string, password: string): Observable<LoginSuccessResponse> {
    const url = `${environment.baseUrl}/auth/login`;
    return this.http.post<LoginSuccessResponse>(url, { username, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('user_token', token);
  }

  logout(): void {
    localStorage.removeItem('user_token');
  }
}
