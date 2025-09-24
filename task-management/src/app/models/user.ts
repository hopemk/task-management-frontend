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
