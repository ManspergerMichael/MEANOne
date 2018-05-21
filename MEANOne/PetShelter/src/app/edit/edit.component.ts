import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet:any
  id:any
  message:any
  constructor(private _http:HttpService,private _route: ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    this.pet = {name:'',type:'',description:'',skill1:'',skill2:'',skill3:''}
    this.id = this._route.snapshot.paramMap.get("id");
    this.get(this.id);
  }

  get(id){
    console.log("Componet!")
    var obs = this._http.getPet(id);
    obs.subscribe(data =>{
      this.pet = data['data'][0];
      console.log(this.pet);
    })
  }

  edit($edit){
    var observeable = this._http.edit(this.id,this.pet);
    observeable.subscribe(data => {
      if(data['message'] == "Success"){
        this._router.navigate(['/pets']);
      } 
    })
  }
}
