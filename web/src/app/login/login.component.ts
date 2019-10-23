import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  constructor(
    private formBuilder: FormBuilder,
     private authenticationService: AuthenticationService,
     private router : Router
      


  ) {

   
    
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      


    });
  }


  get f() {
    return this.loginForm.controls;
  }

  get username() {

    return this.loginForm.controls.username;
  }


  onLogin() {

  // alert("sadasdads");
  this.router.navigate(['home']);
    
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // console.log(this.f.username.value);
    // this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)

    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate(['/Registration']);
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;

    //     });
  }

}
