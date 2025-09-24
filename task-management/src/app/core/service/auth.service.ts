import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface JwtDto {
  token: string;
  type: string;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  roles: string[];
}

export interface LoginSuccessResponse {
  statusCode: number; // 200
  message: string;
  success: true;
  jwtDto: JwtDto;
}

export interface LoginErrorResponse {
  statusCode: number; // 400 or 401
  message: string;
  success: false;
  errorMessages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:9003';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token');
  }

  login(username: string, password: string): Observable<LoginSuccessResponse> {
    const url = `${this.baseUrl}/auth/login`;
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
