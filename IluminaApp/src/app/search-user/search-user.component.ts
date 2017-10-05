import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';
import * as moment from 'moment';
import { Ng2ImgMaxService } from 'ng2-img-max'; 

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  providers: [HttpService]
})
export class SearchUserComponent implements OnInit {

  private errorMesage: String;
  private pathimg: String = "http://localhost:3000/";
  private users: any = [];
  private datauser: any = [];
  //private search:String;
  modalActions1 = new EventEmitter<string|MaterializeAction>();


  constructor(private httpService: HttpService) { }

  public getAllUsers(): void {
    this.httpService.getAllUser().subscribe(
      response => {
        console.log(response);
        this.users = response;
        
      },
      error => {

        this.errorMesage = error.message;
        this.closeModalNo();

      }
    );
  }

  public getUsers(search:String): void {
    this.users = [];
    this.httpService.getUsers(search).subscribe(
      response => {
        console.log(response);
        this.users = response;
        
      },
      error => {

        this.errorMesage = error.message;
        this.closeModalNo();

      }
    );
  }

  public deleteUser(): void {
    this.httpService.deleteUser(this.datauser).subscribe(
      response => {
        console.log(response);
        this.modalActions1.emit({action:"modal",params:['close']});
        this.getAllUsers();
        //this.users = response;
      },
      error => {
        this.errorMesage = error.message;
      }
    );
  }

  public OpenModalConf(user:any): void {
    this.datauser = user;
    this.modalActions1.emit({action:"modal",params:['open']});
  }

  public closeModalNo(): void {
    this.modalActions1.emit({action:"modal",params:['close']});
  }

  ngOnInit() {
    this.getAllUsers();
  }

  onChange(value){

    if(value.length>=3){
      this.getUsers(value);
      //console.log("The user pressed more than 3 letters");
    }else if(value.length<3){
      this.getAllUsers();
    }

  }

}
