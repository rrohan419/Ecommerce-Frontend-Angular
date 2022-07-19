import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }
  getEarings() : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/earrings');
  }
  getEaringById(id:number) 
  {
    return this.http.get<any>('http://localhost:3000/earrings/'+id);

  }
  getNecklaces() : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/necklaces');
  }
  getNecklaceById(id:number) : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/necklaces/'+id);
  }
  getRings() : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/rings');
  }
  getRingById(id:number) : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/rings/'+id);

  }
  getBracelets() : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/bracelets');
  }
  getBraceletById(id:number) : Observable<any>
  {
    return this.http.get<any>('http://localhost:3000/bracelets/'+id);
  }
}
