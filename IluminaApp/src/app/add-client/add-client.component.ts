import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { UserModel } from '../userModel';

@Component({
  selector: 'add-client.information',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class addClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
