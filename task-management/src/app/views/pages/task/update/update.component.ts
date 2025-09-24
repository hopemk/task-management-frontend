import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDto, UpdateTaskRequest, TaskResponse } from '../../../../models/task';
import { TaskService } from '../../../../services/task/task.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  @Input() task!: TaskDto;

  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      taskStatus: ['PENDING', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        taskStatus: 'PENDING'
      });
    }
  }

  get controls() { return this.form.controls; }

  submit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.form.invalid || !this.task?.id) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }

    const payload: UpdateTaskRequest = this.form.value;
    this.loading = true;
    this.taskService.updateTask(this.task.id, payload).subscribe({
      next: (res: TaskResponse) => {
        if (res?.success) {
          this.successMessage = 'Task updated successfully';
          setTimeout(() => this.activeModal.close(true), 300);
        } else {
          this.errorMessage = res?.message || 'Unexpected server response.';
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
          this.errorMessage = 'Failed to update task.';
        }
        this.loading = false;
      }
    });
  }
}
