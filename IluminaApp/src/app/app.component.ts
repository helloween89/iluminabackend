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
    
}