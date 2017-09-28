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

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'adduser',
    pathMatch: 'full'
  },
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
];

@NgModule({
  declarations: [
  AppComponent,
  FileSelectDirective,
  AddUserComponent,
  SearchUserComponent,
  addClientComponent
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
