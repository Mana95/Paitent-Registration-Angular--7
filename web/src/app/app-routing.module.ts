import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserviewComponent } from './userview/userview.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';


const routes: Routes = [


  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'Login',
    component: LoginComponent,

  },

  {
    path: 'Registration',
    component: RegistrationComponent
  },
  {
    path: 'userview',
    component: UserviewComponent
  },

  {
    path: 'editView',
    component: EditModeComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'Registration/:jobid', component: RegistrationComponent

  },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }