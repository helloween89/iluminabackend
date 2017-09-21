import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { EmitterService } from './services/emitter.service';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UpdateInformationComponent } from './update-information/update-information.component';

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
    path: 'updateinfouser',
    component: UpdateInformationComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    SearchUserComponent,
    UpdateInformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)  
  ],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
