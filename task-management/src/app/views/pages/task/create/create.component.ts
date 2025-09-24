import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../../services/task/task.service';
import { CreateTaskRequest, TaskResponse } from '../../../../models/task';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  createForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  get controls() { return this.createForm.controls; }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.createForm.invalid) {
      this.errorMessage = 'Please provide a title and description.';
      return;
    }
    this.loading = true;
    const payload: CreateTaskRequest = this.createForm.value;
    this.taskService.createTask(payload).subscribe({
      next: (res: TaskResponse) => {
        if (res?.success && (res.statusCode === 201 || res.statusCode === 200)) {
          this.successMessage = 'Task created successfully. Redirecting...';
          setTimeout(() => this.router.navigate(['/tasks']), 700);
        } else {
          this.errorMessage = res?.message || 'Unexpected response from server.';
        }
        this.loading = false;
      },
      error: (err) => {
        const e = err?.error as TaskResponse;
        if (e?.errorMessages?.length) {
          this.errorMessage = e.errorMessages.join(' ');
        } else if (err?.status === 0) {
          this.errorMessage = 'Cannot reach server. Please try again later.';
        } else if (e?.message) {
          this.errorMessage = e.message;
        } else {
          this.errorMessage = 'Failed to create task. Please review and try again.';
        }
        this.loading = false;
      }
    });
  }
}
