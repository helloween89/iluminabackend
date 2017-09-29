import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { Routes, RouterModule} from '@angular/router';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { EmitterService } from './services/emitter.service';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { addClientComponent } from './add-client/add-client.component';
import { AuthGuard } from './guards/index';
import { LoginUserComponent } from './login-user/login-user.component';
import { HomeUserComponent } from './home-user/home-user.component';

// Define the routes
const ROUTES = [

{
  path: 'login',
  component: LoginUserComponent
},
{
  path: 'home',
  component: HomeUserComponent,
  canActivate: [AuthGuard],
  children: [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
    {
      path: 'adduser',
      component: AddUserComponent
    },
    {
      path: 'addclient',
      component: addClientComponent
    },
    {
      path: 'searchuser',
      component: SearchUserComponent
    }
    ]
  }

  ]
},  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
  AppComponent,
  FileSelectDirective,
  AddUserComponent,
  SearchUserComponent,
  addClientComponent,
  LoginUserComponent,
  HomeUserComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  MaterializeModule,
  HttpModule,
  RouterModule.forRoot(ROUTES)  
  ],
  providers: [
  EmitterService,
  AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
