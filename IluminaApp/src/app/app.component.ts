import { Component } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent} from './search-user/search-user.component';
import { FormsModule } from '@angular/forms';
import * as _ from "lodash";
import { EmitterService } from './services/emitter.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {

	public title:string = 'Angular 2, Nodejs & MongoDB CRUD';

	private userInfo = 'CRUD_USER_INFO';
    private reset = 'CRUD_RESET_FORM';
    private userList = 'CRUD_USER_LIST';	

	constructor(private _emitterService: EmitterService) {
		
	}

    toggleNav(event):void {
    let allElements = document.getElementsByClassName('selector');
    if(allElements.length > 0)
      	
      _.each(allElements, (element) => {
        element.classList.remove("selector");
      });
  
  	console.log("target:",event.target);
  	console.log("parent:",event.target.parentElement);

  	if(event.target.tagName.toLowerCase() === "div")
  		event.target.classList.add('selector');
  	else
  		event.target.parentElement.classList.add('selector');
  }

}