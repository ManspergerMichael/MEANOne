import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet:any
  id:any
  messages:any
  likeFlag: boolean 
  constructor(private _http:HttpService,private _route: ActivatedRoute, private _router:Router) {

   }

  ngOnInit() {
    this.likeFlag = true;
    this.pet = {name:'',type:'',description:'',skill1:'',skill2:'',skill3:''}
    this.id = this._route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.get(this.id)
    
  }

  get(id){
    //console.log("Componet!")
    var obs = this._http.getPet(id);
    obs.subscribe(data =>{
      this.pet = data['data'][0];
      console.log(this.pet);
    })
  }

  like(){
    //console.log("HI")
      this.pet.likes +=1;
      var observeable = this._http.edit(this.id,this.pet);
      observeable.subscribe(data => {
        //console.log(data['message']);
        this.likeFlag = false;
        console.log(this.likeFlag)
      });
    
  }

  adopt(){
    var observeable = this._http.delete(this.id);
    observeable.subscribe(data => {
      console.log(data['message']);
      this._router.navigate(['/pets'])
    })
  }

}
