import { productModel } from './../../models/product.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../services/order.service';
import { UserService } from './../../shared/user.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { take } from 'rxjs/operators';
import { orderModel } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/services/products.service';

declare var Stripe: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  user!: IUser;
  formModel!: FormGroup;
  items!: any[];
  listProducts: productModel[] = [];
  name: string = "";

  @ViewChild("cardNumber", { static: true }) cardNumberElement!: ElementRef<HTMLInputElement>;
  @ViewChild('cardExpiry') cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc') cardCvcElement!: ElementRef;
  orderm!: orderModel;
  cardError: any;

  private stripe: any;
  private cardNumber: any;
  private cardHandler = this.onChange.bind(this);

  private numberCompleted = false;
  private expiryCompleted = false;
  private cvcCompleted = false;

  processing = false;
  //khởi tạo
  constructor(private productService: ProductsService, private userService: UserService, private cartService: CartService, private fb: FormBuilder, private order: OrderService, private toastr: ToastrService, private router: Router) {
    this.userService.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.user = user;
        if (this.user) {
          this.cartService.getCart(this.user.id.toString()).subscribe(
            res => {
              this.items = res.cartItems;
              this.createForm(user);
              this.addOrderDetail();
            }
          )
        } else {
          this.cartService.getCart("cart_id").subscribe(
            res => {
              this.items = res.cartItems;
            }
          )
        }

      }
    )
    this.productService.getProduct().subscribe(
      res => {
        this.listProducts = res;
      }
    )
  }

  //thực thi sau khi view đã load xong
  ngAfterViewInit(): void {

    this.stripe = Stripe(environment.publishableKey);

    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    const cardExpiry = elements.create('cardExpiry');
    cardExpiry.mount(this.cardExpiryElement.nativeElement);
    cardExpiry.addEventListener('change', this.cardHandler);

    const cardCvc = elements.create('cardCvc');
    cardCvc.mount(this.cardCvcElement.nativeElement);
    cardCvc.addEventListener('change', this.cardHandler);

    console.log(this.cardNumberElement);
  }

  ngOnInit(): void {
    this.ngAfterViewInit();

  }

  //tạo form thông tin đơn hàng
  createForm(user: IUser) {
    if (user == null) {
      this.formModel === null;
    } else {
      this.formModel = this.fb.group({
        user_id: user.id,
        address: ["", Validators.required],
        OrderDetails: this.fb.array([

        ]),
        NameUser: ["", Validators.required]
      })
    }

  }

  orderDetails(): FormArray {
    return this.formModel.get('OrderDetails') as FormArray;
  }

  newOrderDetail(item: any) {
    return this.fb.group({
      ProductId: item.productId,
      Qty: item.qty,
      Price: item.price
    })
  }

  addOrderDetail() {
    for (let item of this.items) {
      this.orderDetails().push(this.newOrderDetail(item));
    }
  }

  sumTotal() {
    var total = 0;
    for (var item of this.items) {
      total += item.qty * item.price;
    }
    return total;
  }

 consoleData(formGroup: FormGroup) {
    this.order.createOrder(formGroup.value).subscribe(
      async res => {
        await this.onSubmit(res.id);
        this.cartService.clearCart();
        this.toastr.success("Đặt hàng thành công");
        //localStorage.removeItem('cart');
        this.router.navigateByUrl("/e-commerce/home");
       
      
      },
      err => {
        this.toastr.success("Đặt hàng không thành công");
      }
    );
  //  location.reload();

 
  }

  onChange(event: any) {
    this.cardError = event.error?.message;

    switch (event.elementType) {
      case 'cardNumber':
        this.numberCompleted = event.complete;
        break;
      case 'cardExpiry':
        this.expiryCompleted = event.complete;
        break;
      case 'cardCvc':
        this.cvcCompleted = event.complete;
        break;
    }
  }

  getImageProduct(id: number) {

    return this.listProducts.find(item => item.id === id)?.image

  }

  async onSubmit(id: number) {
    try {
      this.processing = true;
      const paymentIntent = await this.createPaymentIntent(id);
      const paymentResult = await this.confirmPaymentWithStripe(paymentIntent);
      if (paymentResult.paymentIntent) {
        console.log('Payment succeeded');
        //this.router.navigateByUrl('/paymentsuccess/' + this.orderm.id);
      } else {
        console.log('Payment failed');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  private async createPaymentIntent(id: number) {
    const paymentInput = {
      orderId: id
    };
    return this.order.payment(paymentInput).toPromise();
  }

  private async confirmPaymentWithStripe(paymentIntent: any) {

    return this.stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.formModel.get('NameUser')?.value

        }
      }
    });
  }


}
