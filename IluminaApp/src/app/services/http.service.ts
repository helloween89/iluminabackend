import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
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
	private update_user:String = "userupdate";
	private create_client:String ="client";
	private delete_user:String = "userdel";
	private login:String = "auth/sign_in";
	private userspath = "getusers";
	private userbyid = "getuserbyid";
	private userscount = "getCountUsers";
	public token: string;
	private uploader:FileUploader = new FileUploader({url: this.BASE_URL+this.create_user, itemAlias: 'img'});

	constructor(private http: Http) {

		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;

	}

	public getAllUser(page:string){


		let params: URLSearchParams = new URLSearchParams();
		params.set('page', page);

		// add authorization header with jwt token
		let header = new Headers({ 'Authorization': "JWT " + this.token });
		let options = new RequestOptions({ headers: header });
		options.search = params;

		return this.http.get(`${this.BASE_URL}`+this.userspath, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));
		
	}

	public getUsers(username:String){

		// add authorization header with jwt token
		let header = new Headers({ 'Authorization': "JWT " + this.token });
		let options = new RequestOptions({ headers: header });

		let param = {
			"username" : username,
		}

		return this.http.post(`${this.BASE_URL}`+this.userbyid, param, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));

	}

	public getCountUsers() {

		// add authorization header with jwt token
		let header = new Headers({ 'Authorization': "JWT " + this.token });
		let options = new RequestOptions({ headers: header });


		return this.http.get(`${this.BASE_URL}`+this.userscount, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));

	}

	public addUser(body:UserModel, inputEl:File){

		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			console.log("ImageUpload:uploaded:", item, status, response);
		};


		let formData = new FormData();

		formData.append('username',body.username);
		formData.append('password',body.password);
		formData.append('typeuser',body.typeuser);
		formData.append('img', inputEl);

		return this.http.post(`${this.BASE_URL}`+ this.create_user,formData)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));
	}

	public updateUser(body:UserModel, inputEl:File) {

		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			console.log("ImageUpload:uploaded:", item, status, response);
		};

		let header = new Headers({ 'Authorization': "JWT "+this.token });
		let options = new RequestOptions({ headers: header });
		
		let formData = new FormData();

        formData.append('username',body.username);
		formData.append('password',body.password);
		formData.append('typeuser',body.typeuser);
		formData.append('img', inputEl);

		return this.http.post(`${this.BASE_URL}`+ this.update_user,formData, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

	}

	public addClient(body:clientModel) {

		let age = moment().diff(body.age, 'years');

		// add authorization header with jwt token
		let header = new Headers({ 'Authorization': "JWT "+this.token });
		let options = new RequestOptions({ headers: header });

		let form = {
			"name" : body.name,
			"status" : body.status,
			"sex" : body.sex,
			"age" : age,
			"profession" : body.profession
		}

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


	public logout(): void {
		// clear token remove user from local storage to log user out
		this.token = null;
		localStorage.removeItem('currentUser');
	}

	public deleteUser(body:any) {

		let header = new Headers({ 'Authorization': "JWT "+this.token });
		let options = new RequestOptions({ headers: header });

		let params = {
			"username" : body.username,
			"img" : body.img
		}

		return this.http.post(`${this.BASE_URL}`+this.delete_user, params, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

}
