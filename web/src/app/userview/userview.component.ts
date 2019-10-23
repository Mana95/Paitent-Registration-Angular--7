import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }
  userview: any;
  ngOnInit() {

    this.authenticationService.getAllUsers()
    .subscribe(
      data => {
       this.userview = data
        console.log(data);
      }
    );
  }

}
