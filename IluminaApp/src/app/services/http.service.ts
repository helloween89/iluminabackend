/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserModel } from '../userModel';
import { clientModel } from '../clientModel';
import {Observable} from 'rxjs/Rx';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as moment from 'moment'; 


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

	private BASE_URL:string = 'http://localhost:3000/';
	private create_user:String ="user";
	private create_client:String ="client";
	private uploader:FileUploader = new FileUploader({url: this.BASE_URL+this.create_user, itemAlias: 'img'});

	constructor(
	        private http: Http
	) { }

	public getAllUser(){
		return this.http.get(`${this.BASE_URL}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public addUser(body:UserModel, inputEl:HTMLInputElement){

		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			console.log("ImageUpload:uploaded:", item, status, response);
		};

        
		let formData = new FormData();

		formData.append('username',body.username);
		formData.append('password',body.password);
		formData.append('gender',body.gender);
		formData.append('img', inputEl.files.item(0));

        return this.http.post(`${this.BASE_URL}`+ this.create_user,formData)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

	public addClient(body:clientModel) {

       let age = moment().diff(body.age, 'years');

       // add authorization header with jwt token
        let header = new Headers({ 'Authorization': "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ0eXBldXNlciI6WyJhMSJdLCJfaWQiOiI1OWNhODEwZGQ5YjUxYjFhMDg1MDBjNjkiLCJpYXQiOjE1MDY1MzM5OTd9.02LDbg_SgfCq-2ymlbfYwAVgvv4gdyK25b8kH2juVFU" });
        let options = new RequestOptions({ headers: header });

		let form = {
			"name" : body.name,
			"status" : body.status,
			"sex" : body.sex,
			"age" : age,
			"profession" : body.profession
		}
		//console.log("XXXXXXXX: ", JSON.stringify(form));

        return this.http.post(`${this.BASE_URL}`+ this.create_client, form, options)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
        
	}

	public deleteUser(usersID:string) {

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.delete(`${this.BASE_URL}${usersID}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

}
