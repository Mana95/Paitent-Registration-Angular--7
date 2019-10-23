import { first } from 'rxjs/operators';
import { User } from './../_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { config } from '../config/config';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css']
})
export class EditModeComponent implements OnInit {
   // webcam snapshot trigger
   faceUniqueId: any;
   camTake : any;
   public allowCameraSwitch = true;
   public deviceId: string;
   public showWebcam = false;
   loading = false;
   error = '';

   loadData: any;


   private trigger: Subject<void> = new Subject<void>();
   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public webcamImage: WebcamImage = null;

  data = new User();

  viewForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
  

    this.viewForm = this.formBuilder.group({
    id: ['', Validators.required]

  });


  this.data.firstName = ""
  this.data.lastName = ""
  this.data.role = ""
  this.data.address = ""
  this.data.phonenumber = ""
  this.data.email = "Example@gmail.com"
  


  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);

    this.camTake = webcamImage.imageAsDataUrl;
  //  alert(JSON.stringify(this.camTake));
  this.faceUniqueId = Guid.create()["value"]
  console.log(this.faceUniqueId);
   // alert(JSON.stringify(this.camTake));
    this.webcamImage = webcamImage;
  }

  
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  get f() {

    return this.viewForm.controls;

  }


  getRecord(): void {
    this.showWebcam = !this.showWebcam;
    
    this.trigger.next();

    let id = {
      "id": this.f.id.value
    }
      // alert(this.f.id.value);
    //this.router.navigate(['/editView', id]);
    // this.authenticationService.getById(this.f.id.value)
    // .subscribe(
    //   values => {
    //  this.data = values[0]
    // console.log(this.data)
       
    //   }
    // );
    console.log("This is the passing id" + this.f.id.value);
    
      let face_Information = {
        "uniqueId": this.faceUniqueId, "camImage" : this.camTake
      }
      console.log(face_Information);
      this.authenticationService.saveInfo(face_Information)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
            this.error = error;
            this.loading = false;
        });

  // this.getFaceRecord();


  }

  getFaceRecord() {
    let pythonId =  this.faceUniqueId;
     this.http.get<any>(config.PAPYRUS + `/getUserData/${pythonId}`)
    .subscribe(
      values => {
     this.data = values;
    console.log("heherefe" + values.data);
    this.loadData = values.data;
    this.LoadDataDb();
       
      }
    );


    // this.authenticationService.getById( this.loadData)
    // .subscribe(
    //   values => {
    //  this.data = values[0]
    // console.log(this.data)
       
    //   }
    // );



  }

  LoadDataDb() {
    this.authenticationService.getById( this.loadData)
    .subscribe(
      values => {
     this.data = values[0]
    console.log(this.data)
       
      }
    );

  }





}
