import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';
import { loginModel } from '../loginModel';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize'; 

@Component({
	selector: 'app-login-user',
	templateUrl: './login-user.component.html',
	styleUrls: ['./login-user.component.css'],
	providers: [ HttpService ]
})
export class LoginUserComponent {

	private loginModel:loginModel = new loginModel('','');
	private errorMesage:String;

	constructor(private httpService: HttpService, private router: Router) {}

	public login(): void {
		this.httpService.loginAuth(this.loginModel).subscribe(
			response =>  {
				console.log(response);
				if (response === true) {
					this.router.navigate(['home']);
				} else {
					this.errorMesage = 'Username or password is incorrect';
					//this.loading = false;
				}

			},
			error=> {
				this.errorMesage = error.message;
				console.log(this.errorMesage);
			}
			);
	}

}
