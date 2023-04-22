import{FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit } from '@angular/core';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type:string ="password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  loginError: string = '';
  constructor (private fb: FormBuilder, private auth: AuthService, private router: Router){ }

  onLogin() {
    this.loginError = '';
    if (this.loginForm.valid){
      console.log(this.loginForm.value)
      // Send the obj to the database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res.message);
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          console.log('got here');
          console.log(err?.error.message)
          this.loginError = err?.error.message;
        }
      })

    } else{

      // Throw error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

  ngOnInit(): void {
    this.loginError = '';
     this.loginForm = this.fb.group({
      username:['', Validators.required],
      password: ['', Validators.required]
     }) 
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

}
