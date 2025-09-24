import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterSuccessResponse {
  statusCode: number; // 201
  message: string; // "User created successfully."
  success: true;
  userDto: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
  };
}

export interface RegisterErrorResponse {
  statusCode: number; // 400
  message: string;
  success: false;
  errorMessages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:9003';

  constructor(private http: HttpClient) { }

  register(payload: RegisterRequest): Observable<RegisterSuccessResponse> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<RegisterSuccessResponse>(url, payload).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
