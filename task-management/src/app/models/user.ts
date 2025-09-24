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

// Registration models
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
