/*
* Angular 2 CRUD application using Nodejs
*/

import { Component, Input, OnInit,  ElementRef, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';
import * as moment from 'moment'; 

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [ HttpService ]
})

export class AddUserComponent {

	private isInsert:boolean = true;
	private userModel:UserModel = new UserModel('','','');
	private errorMesage:String;
	modalActions1 = new EventEmitter<string|MaterializeAction>();
	modalActions2 = new EventEmitter<string|MaterializeAction>();

	constructor(private httpService: HttpService, private el: ElementRef) {}

	public addUser(): void {
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#img');
		console.log(inputEl);
		this.httpService.addUser(this.userModel, inputEl).subscribe(
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
		//EmitterService.get(this.reset).emit(true);
		this.isInsert = true;
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