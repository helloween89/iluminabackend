import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
})
export class HomeUserComponent implements OnInit {


  ngOnInit() {
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
