import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { clientModel } from '../clientModel';
import { EmitterService } from '../services/emitter.service';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize'; 

@Component({
	selector: 'add-client.information',
	templateUrl: './add-client.component.html',
	styleUrls: ['./add-client.component.css'],
	providers: [ HttpService ]
})
export class addClientComponent implements OnInit {

	private clientModel:clientModel = new clientModel('','','',0,'');
	private errorMesage:String;
	modalActions1 = new EventEmitter<string|MaterializeAction>();
	modalActions2 = new EventEmitter<string|MaterializeAction>();


	constructor(private httpService: HttpService) { }

	ngOnInit() {
		
	}

	public addClient(): void {
		
		this.httpService.addClient(this.clientModel).subscribe(
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
		this.clientModel = new  clientModel('','','',0,'');
		//EmitterService.get(this.reset).emit(true);
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
