/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserModel } from '../userModel';
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
			.catch((error:any) => Observable.throw(error.json().error || 'Se	rver error'));
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
		console.log(formData);

        return this.http.post(`${this.BASE_URL}`+ this.create_user,formData)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

	public addClient(body:UserModel) {

       let formData = new FormData();
       let age;

		formData.append('name',body.username);
		formData.append('status',body.password);
		formData.append('sex',body.gender);
		formData.append('age',body.gender);
		formData.append('profession',body.gender);

/*
        return this.http.post(`${this.BASE_URL}`+ this.create_client,formData)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
        */

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
