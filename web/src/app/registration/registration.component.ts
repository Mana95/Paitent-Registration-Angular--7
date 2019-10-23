import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public showWebcam = false;
  public allowCameraSwitch = true;
  public deviceId: string;
 public selectOption = true;
  registerFrom: FormGroup;
  patientRole: any;
  submitted = false;
  loading = false;
  error = '';
  returnUrl: string;
  public selectOption1 = true;

  camTake : any;


  Patients = [
    'User', 'Admin'
  ]
 

   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();

   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

   public webcamImage: WebcamImage = null;



   public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.registerFrom = this.formBuilder.group({

      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      rolename :[''],
      // rolename: ['sdsdsds', Validators.required],
      emailname: ['', [Validators.required, Validators.email]],
      address: ['',Validators.required],
      phonenumber:['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]]


    });


    this.returnUrl = this.route.snapshot.queryParams['Registration'] || '/';
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);

    this.camTake = webcamImage.imageAsDataUrl;
   // alert(JSON.stringify(this.camTake));
    this.webcamImage = webcamImage;
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }


  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public triggerSnapshot(): void {
    this.showWebcam = !this.showWebcam;
    
    this.trigger.next();
  }

  get f() {

    return this.registerFrom.controls;

  }

  get username() {


    return this.registerFrom.controls.username;

  }

  roleName(event) {

    this.patientRole = event.target.value;

  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }

  }


  onSubmit() {

    console.log("You are now in the onSubmit Method")

    this.submitted = true;
    this.loading = true;

    let userParam = {

      "id" : this.f.id.value, "firstName" : this.f.firstname.value, "lastName": this.f.lastname.value, "role":  this.patientRole, "email": this.f.emailname.value, "phonenumber": this.f.phonenumber.value, "address": this.f.address.value , "image":  this.camTake
    
    }
    
    console.log(JSON.stringify(userParam));


      if(this.registerFrom.valid){



    this.authenticationService.register(userParam)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
          this.error = error;
          this.loading = false;
      });

    } else {
      alert("Please check the Fields");
    }
      
      if(this.registerFrom.valid){
        alert("Register succeeded");
        this.submitted = false;
        this.selectOption = false;
        this.selectOption1 = false;
         this.registerFrom.reset();
       }
        
        this.webcamImage = null;




  }
 
}
