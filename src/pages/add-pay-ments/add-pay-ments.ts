import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


// provider
// import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-add-pay-ments',
  templateUrl: 'add-pay-ments.html',
})
export class AddPayMentsPage {
  payments: any;
  public loader;
  public buttonClicked: boolean = true;
  public creditcardClicked: boolean = false;
  public cashcardClicked: boolean = false;
  public paymentsList: boolean = false;
  payment_method_list: any;
  action: any = 0;

  choose: any;
  // method: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // public auth: AuthServiceProvider,
    public loadingCtrl: LoadingController,
  ) {

    this.payment_method_list = this.getPaymentMethods();
    console.log(this.getPaymentMethods());
    console.log("ejecutate");
    this.action = this.payment_method_list;
    console.log("action = " + JSON.stringify(this.action));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPayMentsPage');
  }

  AddCreditCard(FormCreditCard){
    console.log("Esto esta funcionando");
    console.log(FormCreditCard.cc_name);
    console.log(FormCreditCard.cc_number);
    console.log(FormCreditCard.cc_expiration_date);
    console.log(FormCreditCard.cc_security_code);
    var oldItems = JSON.parse(localStorage.getItem('payment_method')) || [];
    var credit_card_info = {
      // "credit_card_payment":[{
          id: "credit card",
          es_name: "Tarjeta de credito",
          icon_method: "credit-card",
          name: FormCreditCard.cc_name,
          number: FormCreditCard.cc_number,
          expiration_date: FormCreditCard.cc_expiration_date,
          security_code: FormCreditCard.cc_security_code
      // }]
    };
    oldItems.push(credit_card_info);
    window.localStorage.setItem("payment_method", JSON.stringify(oldItems)); // Almacenar datos del pago en el localStorage
    // loader
    let loader = this.loadingCtrl.create({
      content: "Agregando metodo de pago",
      duration: 500
    });
    loader.present();
    this.navCtrl.setRoot(this.navCtrl.getActive().component); // actualizamos la pagina actual
    this.creditcardClicked = false; // quitamos el formulario de tarjeta de creditos
  }


  onChange(e){
    console.log(e);

    if(e === "creditcard"){
      // console.log("Esto se almacenara en la base de datos.")
      this.creditcardClicked = !this.creditcardClicked;

    }else if(e === "cash"){
      console.log("cash se almacenara en la base de datos.")
      var oldItems = JSON.parse(localStorage.getItem('payment_method')) || [];
      oldItems.push({
        id: "cash",
        es_name: "Efectivo",
        icon_method: "money"
      });
      window.localStorage.setItem("payment_method", JSON.stringify(oldItems)); // Almacenar datos del pago en el localStorage      // this.buttonClicked = !this.buttonClicked;

      let loader = this.loadingCtrl.create({
        content: "Agregando metodo de pago",
        duration: 500
      });

      loader.present();
      this.navCtrl.setRoot(this.navCtrl.getActive().component); // reiniciamos la pagina actual

      // quitar demas metodos
      this.creditcardClicked = false;

    //  this.authService.postData(this.userData,'login').then((result) => {
    //   this.responseData = result;
    //   console.log(this.responseData);
    //   localStorage.setItem('userData', JSON.stringify(this.responseData));
    //   this.navCtrl.setRoot("HomePage");
    // }, (err) => {
    //   console.log(err);
    // });


    }else{
      this.creditcardClicked = false;
      this.cashcardClicked = false;

    }
  }// fin onChange

  getPaymentMethods(){
       return JSON.parse(window.localStorage.getItem('payment_method'));
  }

}
