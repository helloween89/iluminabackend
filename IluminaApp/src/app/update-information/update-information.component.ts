import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { UserModel } from '../userModel';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.css']
})
export class UpdateInformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
