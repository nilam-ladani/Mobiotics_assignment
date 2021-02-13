import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductListService {

  public totalSubject = new Subject();
  public orderSubject = new Subject();
  orders = [];

  url: any = "../../../assets/product-list.json"

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    let promise = this.http.get(this.url).toPromise();
    return promise;
  }

  sendTotal(totalVal) {
    this.totalSubject.next(totalVal)
  }

  sendTotalProd(value) {
    this.orderSubject.next(value)
  }


}
