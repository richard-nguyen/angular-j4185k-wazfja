import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Data {
  year: Date;
  sales: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public data : Data[] = [];
  public count : number = 12;
  constructor() { 

  }

  getData(push : boolean) :  Data[] { 
    if (push)  
    for (var i = 0; i < this.count; i++) {
      this.data.push({year : new Date(1990, i, 1), sales : 10 + Math.random() * Math.floor(i)});
    }
    return this.data;
   }
   updateData() : void {
    this.data.push({year : new Date(1990, this.count, 1), sales : 10 + (Math.random() * Math.floor(this.count) % 10)});
    this.count++;
   }

}