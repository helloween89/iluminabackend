import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserModel } from '../userModel';
import { clientModel } from '../clientModel';
import { loginModel } from '../loginModel';
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
	private login:String = "auth/sign_in";
	public token: string;
	private uploader:FileUploader = new FileUploader({url: this.BASE_URL+this.create_user, itemAlias: 'img'});

	constructor(private http: Http) {

		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;

	}

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

	public loginAuth(body:loginModel): Observable<boolean> {

		let form = {
			"username" : body.username,
			"password" : body.password,
		}

		return this.http.post(`${this.BASE_URL}`+ this.login, form)
		.map((response: Response) => {
			// login successful if there's a jwt token in the response
			let token = response.json() && response.json().token;
			if (token) {
				// set token property
				this.token = token;

				// store username and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('currentUser', JSON.stringify({ username: body.username, token: token }));

				// return true to indicate successful login
				return true;
			} else {
				// return false to indicate failed login
				return false;
			}
		});

	}


	logout(): void {
		// clear token remove user from local storage to log user out
		this.token = null;
		localStorage.removeItem('currentUser');
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
