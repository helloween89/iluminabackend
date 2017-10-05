/*
* Angular 2 CRUD application using Nodejs
*/

import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';
import * as moment from 'moment';
import { Ng2ImgMaxService } from 'ng2-img-max'; 

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
	private uploadedImage: File;
	modalActions1 = new EventEmitter<string|MaterializeAction>();
	modalActions2 = new EventEmitter<string|MaterializeAction>();

	constructor(private httpService: HttpService, private ng2ImgMax: Ng2ImgMaxService) {}

	public addUser(): void {
		this.httpService.addUser(this.userModel, this.uploadedImage).subscribe(
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

	public onImageChange(event) : void {
		let image = event.target.files[0];

		this.ng2ImgMax.resizeImage(image, 100, 80).subscribe(
			result => {
				 this.uploadedImage = new File([result], result.name);
				 console.log("img ",this.uploadedImage);
			},
			error => {
				console.log('Error to upload the file', error);
			}
			);
	}

	public validateForm() :void {

		let username = this.userModel.username;
		let password = this.userModel.password;
		let typeuser = this.userModel.typeuser;

		if(username.length>=4 && password.length>=6 && typeuser.length>0 && this.uploadedImage !=undefined) {
			this.addUser();
		}else{

			if(typeuser.length==0){

				this.errorMesage = "Please select a kind of user";
				this.OpenModalFail();
			}else if(this.uploadedImage === undefined){
				this.errorMesage = "Please select a picture";
				this.OpenModalFail();
			}

		}

	}

}