import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../../services/task/task.service';
import { TaskDto, TaskResponse } from '../../../../models/task';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent implements OnInit {
  task: TaskDto | null = null;
  loading = false;
  errorMessage: string | null = null;
  notFound = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id)) {
      this.errorMessage = 'Invalid task id.';
      return;
    }
    this.fetchTask(id);
  }

  private fetchTask(id: number): void {
    this.loading = true;
    this.errorMessage = null;
    this.notFound = false;
    this.taskService.getTask(id).subscribe({
      next: (res: TaskResponse) => {
        this.task = res?.taskDto ?? null;
        this.loading = false;
      },
      error: (err) => {
        if (err?.status === 404) {
          this.notFound = true;
        } else if (err?.status === 0) {
          this.errorMessage = 'Cannot reach server. Please try again later.';
        } else {
          this.errorMessage = 'Failed to load task.';
        }
        this.loading = false;
      }
    });
  }
}
