import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: any
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this.show();
  }
  show(){
    var observeable = this._http.get();
    observeable.subscribe(data => {
      this.pets = Array.of(data['data']);
      console.log(this.pets);
    })
  }
}
