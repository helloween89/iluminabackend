import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  providers: [HttpService]
})
export class SearchUserComponent implements OnInit {

  private errorMesage: String;
  private users: any = [];

  constructor(private httpService: HttpService) { }

  public getUsers(): void {
    this.httpService.getAllUser().subscribe(
      response => {
        console.log(response);
        this.users = response;
        
      },
      error => {
        this.errorMesage = error.message;
      }
    );
  }

  ngOnInit() {
    this.getUsers();
  }

}
