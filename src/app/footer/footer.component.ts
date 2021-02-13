import { ProductListService } from './../product-list/_service/product-list.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  added = 0;
  totalvalue;
  subscription: Subscription;
  @Input() data: any;
  @Output() checkOut = new EventEmitter;
  totalOrders = [];

  constructor(
    private pls: ProductListService,
  ) { }

  ngOnInit(): void {
    this.pls.totalSubject.subscribe(totalvalue => {
      this.totalvalue = totalvalue;
    });
    this.pls.orderSubject.subscribe(totalOrder => {
      this.totalOrders.push(totalOrder)
      this.calcTotal();
    });
    console.log(this.added);
  }
  calcTotal() {
    let sum = 0;
    for (var i = 0; i < this.totalOrders.length; i++) {
      sum += this.totalOrders[i].price;
      this.added = sum;
    }
  }

  reduceTotal() {

  }
  openModal() {
    alert(JSON.stringify(this.totalOrders));
  }
}
