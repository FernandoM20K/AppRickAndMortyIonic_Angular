import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private http:HttpClient) { }

  getCaharacter(params: any){
    return this.http.get(environment.baseUrl + environment.charecter, {params})
  }

  getCharacterById(id: string){
    return this.http.get(environment.baseUrl + environment.charecter + id)
  }

  getByUrl(url: string){
    return this.http.get(url)
  }
  
}
