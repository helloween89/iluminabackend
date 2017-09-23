/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/


import { Component,Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [ HttpService ]
})
export class AddUserComponent {


	private isInsert:boolean = true;
	private userModel:UserModel = new UserModel('','','');


	constructor(
			private httpService: HttpService
		) {}

	public addUser(): void {
		this.httpService.addUser(this.userModel).subscribe(
                        response =>  {
	                      console.log(response);
	                      alert("The user was created successfully");
	                      this.resetAddUser(); 
                        },
                        error=> {
                        	//console.log(error.errmsg);
                       		alert("The user was already added"+JSON.stringify(error));
                       	}
                    );
	}

	public resetAddUser():void {
		this.userModel = new UserModel('','','');
		//EmitterService.get(this.reset).emit(true);
		this.isInsert = true;
	}

}