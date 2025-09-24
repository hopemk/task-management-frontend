import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDto, TaskResponse } from '../../../../models/task';
import { TaskService } from '../../../../services/task/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from '../update/update.component';
import { AuthService } from '../../../../core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  tasks: TaskDto[] = [];
  loading = false;
  errorMessage: string | null = null;
  notFound = false;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openUpdate(task: TaskDto): void {
    const modalRef = this.modalService.open(UpdateComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.task = task;
    modalRef.closed.subscribe((changed: boolean) => {
      if (changed) {
        this.fetchTasks();
      }
    });
  }

  async confirmDelete(task: TaskDto): Promise<void> {
    const result = await Swal.fire({
      title: 'Delete this task?',
      text: `This will permanently delete "${task.title}" (ID: ${task.id}).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      this.loading = true;
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Task has been deleted.' });
          this.fetchTasks();
        },
        error: (err) => {
          if (err?.status === 0) {
            Swal.fire({ icon: 'error', title: 'Network error', text: 'Cannot reach server. Please try again later.' });
          } else if (err?.status === 404) {
            Swal.fire({ icon: 'error', title: 'Not found', text: 'Task not found or already deleted.' });
          } else {
            Swal.fire({ icon: 'error', title: 'Delete failed', text: 'An error occurred while deleting the task.' });
          }
          this.loading = false;
        }
      });
    }
  }

  private fetchTasks(): void {
    this.loading = true;
    this.errorMessage = null;
    this.notFound = false;
    this.taskService.getTasks().subscribe({
      next: (res: TaskResponse) => {
        this.tasks = res?.taskDtoList ?? [];
        this.loading = false;
      },
      error: (err) => {
        if (err?.status === 404) {
          this.notFound = true;
        } else if (err?.status === 0) {
          this.errorMessage = 'Cannot reach server. Please try again later.';
        } else {
          this.errorMessage = 'Failed to load tasks.';
        }
        this.loading = false;
      }
    });
  }
}
