import { Component, OnInit, EventEmitter} from '@angular/core';
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
	private errorMessage:String;
	modalActions2 = new EventEmitter<string|MaterializeAction>();

	constructor(private httpService: HttpService, private router: Router) {}

	public login(): void {
		this.httpService.loginAuth(this.loginModel).subscribe(
			response =>  {
				console.log(response);
				if (response === true) {
					this.router.navigate(['home/adduser']);
				} else {

					this.errorMessage = 'Username or password are incorrect';
					console.log("Test 2",this.errorMessage);
					
				}

			},
			error=> {
				this.OpenModalFail();
				this.errorMessage = error.json().message;
				console.log("Test",this.errorMessage);
			}
			);
	}

	ngOnInit() {
        // reset login status
        this.httpService.logout();
    }

	public OpenModalFail(): void {
		this.modalActions2.emit({action:"modal",params:['open']});
	}

	public closeModalFail(): void {
		this.modalActions2.emit({action:"modal",params:['close']});
	}


}
