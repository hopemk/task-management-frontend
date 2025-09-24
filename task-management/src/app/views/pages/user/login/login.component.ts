import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { LoginErrorResponse, LoginSuccessResponse } from '../../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }
    this.loading = true;
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (res: LoginSuccessResponse) => {
        if (res?.success && res.jwtDto?.token) {
          this.authService.saveToken(res.jwtDto.token);
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = 'Unexpected response from server.';
        }
        this.loading = false;
      },
      error: (err) => {
        const e = err?.error as LoginErrorResponse;
        if (e && e.errorMessages && e.errorMessages.length > 0) {
          this.errorMessage = e.errorMessages.join(' ');
        } else if (err?.status === 0) {
          this.errorMessage = 'Cannot reach authentication server. Please try again later.';
        } else {
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
        this.loading = false;
      }
    });
  }
}
