export interface TaskDto {
  id: number;
  title: string;
  description: string;
  entityStatus: 'ACTIVE' | 'INACTIVE' | 'DELETED' | string;
  taskStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | string;
  createdAt: string;
  createdBy: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  taskStatus: string;
}

export interface TaskResponse {
  statusCode: number;
  message: string;
  success: boolean;
  taskDto?: TaskDto;
  taskDtoList?: TaskDto[];
  errorMessages?: string[];
}
