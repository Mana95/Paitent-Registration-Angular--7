import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
  import { config } from '../config/config.js';
  import { User } from '../_models';


@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) { }


  //Getting the currentUser
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }



//Here is the Registration
  register(userParam): Observable<any> {
    //methin thamai call karala thiyenne back end ekata 
          console.log (userParam );
          return this.http.post<any>(config.PAPYRUS+`/users/register`, userParam)
          .pipe(map(user => {
            // register successfull if there is a jwt token in the response
            return user;
          }));
       }


       getById(id: number): Observable<User> {
       
         console.log("This is the serviceclass" + id);
        console.log(JSON.stringify(id));
        return this.http.get<User>(config.PAPYRUS+`/users/userid/${id}`);
        


       }

       saveInfo(face_Information): Observable<any> {
         console.log(face_Information);
         return this.http.post<any>(config.PAPYRUS+`/details/faceRegister`, face_Information)

       }

   login(username: string, password: string): Observable<any> {
    console.log(username + password);
   return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { username, password })
     .pipe(map(user => {
       // login successfull if there is a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
       }

       return user;
     }));
  }

  getAllUsers() {
  
    return this.http.get(config.PAPYRUS+`/users/u`);
  
  }
    



}
