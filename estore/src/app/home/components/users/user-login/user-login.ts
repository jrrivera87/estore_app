import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ɵInternalFormsSharedModule } from '@angular/forms'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss'
})
export class UserLogin implements OnInit{
  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  onSubmit() {}
}
