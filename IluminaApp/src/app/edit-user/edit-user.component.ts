import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';
import * as moment from 'moment'; 

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [HttpService]
})
export class EditUserComponent implements OnInit {


  private userModel: UserModel;
  private username;
  private typeuser;
  private errorMesage:String;
  modalActions1 = new EventEmitter<string|MaterializeAction>();
  modalActions2 = new EventEmitter<string|MaterializeAction>();


  constructor(private route: ActivatedRoute, private httpService: HttpService, private el: ElementRef) { }

  
  ngOnInit() {
    // subscribe to router event
      this.route.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      this.typeuser = params['typeuser'];
      this.userModel = new UserModel(this.username,'',this.typeuser);
      console.log(this.username);
      console.log(this.typeuser);
    });
  }

  public updateUser(): void {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#img');
    console.log(inputEl);
    this.httpService.updateUser(this.userModel, inputEl).subscribe(
                        response =>  {
                        console.log(response);
                        this.OpenModalSuccess();
                        this.resetAddUser();
                        },
                        error=> {
                           this.errorMesage = error.message;
                           this.OpenModalFail();
                         }
                    );
  }

  public resetAddUser():void {
    this.userModel = new UserModel('','','');
  }

  public OpenModalSuccess(): void {
    this.modalActions1.emit({action:"modal",params:['open']});
  }

  public closeModalSuccess(): void {
    this.modalActions1.emit({action:"modal",params:['close']});
  }

  public OpenModalFail(): void {
    this.modalActions2.emit({action:"modal",params:['open']});
  }

  public closeModalFail(): void {
    this.modalActions2.emit({action:"modal",params:['close']});
  }

}
