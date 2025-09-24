import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { RegisterErrorResponse, RegisterRequest, RegisterSuccessResponse } from '../../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    this.loading = true;
    const payload: RegisterRequest = this.registerForm.value;
    this.userService.register(payload).subscribe({
      next: (res: RegisterSuccessResponse) => {
        if (res?.success && res.statusCode === 201) {
          // Optionally show a success message then redirect
          this.successMessage = 'Registration successful. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 800);
        } else {
          this.errorMessage = 'Unexpected response from server.';
        }
        this.loading = false;
      },
      error: (err) => {
        const e = err?.error as RegisterErrorResponse;
        if (e && e.errorMessages && e.errorMessages.length > 0) {
          this.errorMessage = e.errorMessages.join(' ');
        } else if (err?.status === 0) {
          this.errorMessage = 'Cannot reach server. Please try again later.';
        } else {
          this.errorMessage = 'Registration failed. Please review the form and try again.';
        }
        this.loading = false;
      }
    });
  }
}
