import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterRequest, RegisterSuccessResponse } from '../../models/user';

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
