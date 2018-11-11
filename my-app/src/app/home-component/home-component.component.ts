import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})

export class HomeComponentComponent implements OnInit {

  public readonly session_id;
  postTitle = "AS";

  myFunc(a,b){

  }

  constructor() {
    let s_id = sessionStorage.getItem("session_id");
    if (s_id == null){
      return;
    }
    this.session_id = s_id;
   }

  ngOnInit() {
   

  }

}
