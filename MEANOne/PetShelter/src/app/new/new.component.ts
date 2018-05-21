import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  pet:any
  messages:any
  errorFlag: boolean
  constructor(private _http:HttpService,private _route: ActivatedRoute, private _router:Router) {
    this.pet = {name:"",type:"",description:"",skill1:"",skill2:"",skill3:""}
    this.messages = [];
    this.errorFlag = false
   }

  ngOnInit() {
  }

  create(event){
    this.messages = [];
    let obs = this._http.create(this.pet);
    obs.subscribe(data => {
      if(data['message'] == "Error"){
        console.log(data);
        this.messages.push(data['error']['errors']['name']['message']);
        this.messages.push(data['error']['errors']['type']['message']);
        this.messages.push(data['error']['errors']['description']['message']);
      }
      else{
        console.log(this.pet);
        this._router.navigate(['/pets']);
      }
    })

  }

}
