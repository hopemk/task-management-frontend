import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateTaskRequest, UpdateTaskRequest, TaskResponse } from '../../models/task';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = environment.baseUrl + '/api/tasks';
  private readonly jsonHeaders = new HttpHeaders({ 'Accept': 'application/json' });

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskResponse> {
    const url = `${this.taskUrl}`;
    return this.http.get<TaskResponse>(url).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  createTask(payload: CreateTaskRequest): Observable<TaskResponse> {
    const url = `${this.taskUrl}`;
    return this.http.post<TaskResponse>(url, payload).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  updateTask(id: number, payload: UpdateTaskRequest): Observable<TaskResponse> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.put<TaskResponse>(url, payload).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  getTask(id: number): Observable<TaskResponse> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<TaskResponse>(url, { headers: this.jsonHeaders }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.delete(url, { headers: this.jsonHeaders }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
