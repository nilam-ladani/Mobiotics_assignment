import { ProductListService } from './_service/product-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList;
  products: any;
  totalcartvalue = 0;
  value;
  orders = []

  constructor(
    private apiService: ProductListService
  ) { }

  ngOnInit(): void {
    this.apiService.getAllProducts().then(value => {
      console.log(value);
      this.productList = value;
      this.products = value;
      // this.apiService.orders.push(value);
    })
  }

  addCart(idx, pId, item) {

    this.apiService.totalSubject.next(item);
    this.totalcartvalue += 1;
    // console.log(this.totalcartvalue + "cart value dsgsg")
    let count = 1
    let push = true
    if (this.products[idx].quantity == 0) {
      return
    }

    for (let ords of this.apiService.orders) {
      if (ords.indexVal == idx) {
        console.log("index value already")
        ords.quantity++;
        push = false;
      }
    }
    if (push) {
      this.apiService.orders.push({ "indexVal": idx, "quantity": count })
    }

    this.products[idx].quantity--;
    this.apiService.sendTotal(this.totalcartvalue);
  }

  addToCart(idx, pId, item) {
    //Add to cart 
    console.log(item);
    this.apiService.sendTotalProd(item);
    this.totalcartvalue += 1;
    let count = 1
    let push = true
    if (this.products[idx].quantity == 0) {
      return
    }

    for (let ords of this.apiService.orders) {
      if (ords.indexVal == idx) {
        ords.quantity++;
        push = false;
      }
    }
    if (push) {
      this.apiService.orders.push({ "indexVal": idx, "quantity": count })
    }
    this.products[idx].quantity--;
    this.apiService.sendTotal(this.totalcartvalue);
    //send to service
  }

  removeFromCart(idx, pId) {
    if (this.totalcartvalue === 0) {
      return;
    } else {
      this.totalcartvalue -= 1;
      this.products[idx].quantity++;
      for (let ord of this.apiService.orders) {
        if (ord.indexVal == idx) {
          ord.quantity -= 1;

        }
      }
      this.apiService.sendTotal(this.totalcartvalue)
    }
  }

  getQuantity(i) {
    for (let orders of this.apiService.orders) {
      if (orders.indexVal == i) {
        return orders.quantity;
      }
    }
  }


}
