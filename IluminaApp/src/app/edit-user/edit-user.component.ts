import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [HttpService]
})
export class EditUserComponent implements OnInit {


  private userModel: UserModel;
  private username
  private typeuser;


  constructor(private route: ActivatedRoute, private httpService: HttpService, private el: ElementRef) { }

  
  ngOnInit() {
    // subscribe to router event
    this.route.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      this.typeuser = params['typeuser'];
      this.userModel = new UserModel(this.username,'',this.typeuser);
      console.log(this.username);
      console.log(this.typeuser);
    });
  }

}
