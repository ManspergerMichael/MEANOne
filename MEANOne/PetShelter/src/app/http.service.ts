import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  get(){
    return this._http.get('/getAll')
  }

  create(data){
    return this._http.post('/create', data)
  }

  getPet(id){
    console.log("Service!")
    return this._http.get('/getPet/'+id);
  }

  edit(id, data){
    return this._http.post('/edit/'+id, data);
  }

  delete(id){
    return this._http.get('/delete/'+id);
  }
}
