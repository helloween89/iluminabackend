import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UserModel } from '../userModel';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';
import * as moment from 'moment'; 
import { Ng2ImgMaxService } from 'ng2-img-max'; 

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [HttpService]
})
export class EditUserComponent implements OnInit {


  private userModel: UserModel;
  private username;
  private typeuser;
  private img;
  private errorMesage:String;
  private uploadedImage: File;
  modalActions1 = new EventEmitter<string|MaterializeAction>();
  modalActions2 = new EventEmitter<string|MaterializeAction>();


  constructor(private route: ActivatedRoute, private httpService: HttpService, private ng2ImgMax: Ng2ImgMaxService) { }

  
  ngOnInit() {
    // subscribe to router event
      this.route.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      this.typeuser = params['typeuser'];
      this.img = params['img'];
      this.userModel = new UserModel(this.username,'',this.typeuser);
      console.log(this.img);
    });
  }

  public updateUser(): void {
    this.httpService.updateUser(this.userModel, this.uploadedImage).subscribe(
                        response =>  {
                        console.log(response);
                        this.OpenModalSuccess();
                        this.resetAddUser();
                        this.deleteImage();
                        },
                        error=> {
                           this.errorMesage = error.message;
                           this.OpenModalFail();
                         }
                    );
  }

  public resetAddUser():void {
    this.userModel = new UserModel('','','');
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

  public onImageChange(event) : void {
    let image = event.target.files[0];

    this.ng2ImgMax.resizeImage(image, 100, 80).subscribe(
      result => {
         this.uploadedImage = new File([result], result.name);
         console.log("img ",this.uploadedImage);
      },
      error => {
        console.log('Error to resize the image', error);
      }
      );
  }

  public deleteImage(): void {

    let fs = require('fs');

    fs.unlink('uploadedimages/'+this.img,  (err) => {
      if(err){
        console.log("failed to delete local image:"+err);
      }else{
        console.log('successfully deleted local image');
      }    
    });

  }
    

}
