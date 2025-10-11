import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users/user-service';
import { loginToken } from '../../../types/user.type';
import { NgClass, Location } from '@angular/common';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss'
})
export class UserLogin implements OnInit{
  userLoginForm: FormGroup;
  alertType: number;
  alertMessage: string = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private location: Location) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(): AbstractControl<any,any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any,any> | null {
    return this.userLoginForm.get('password')
  }

  onSubmit() {
    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next:(result: loginToken) => {
        result.user.email = this.email?.value;
        this.userService.activateToken(result);
        this.alertType = 0;
        this.alertMessage = 'Login succsesful';
        setTimeout(() => {
          this.location.back();
        }, 1000);
      }, error:(error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;
      }
    })
  }
}
