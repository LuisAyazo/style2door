import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';


@IonicPage()
@Component({
  selector: 'page-woman',
  templateUrl: 'woman.html',
})
export class WomanPage {
  chk_service: boolean;
  redirectPage:any;
  obj_buy: any[] = []; // Definir e inicializar array en blanco
  data: any;
  count:number = 0;
  fb_data:any = [];
  itemMP: Array<{id: any, title: string, checked: any, description: string, value: any}>;
  private userId;
  shoppingListRef$: AngularFireList<ShoppingItem[]>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private database: AngularFireDatabase,
    private angularFauth:AngularFireAuth
  ) {

    this.userId = this.angularFauth.auth.currentUser.uid;
    this.itemMP = [
      { id:1, title: 'Manicure', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '14.500'},
      { id:2, title: 'Pedicure', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '17.800' },
      { id:3, title: 'Remocion semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '10.000' },
      { id:4, title: 'Manicure semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '12.600' },
      { id:5, title: 'Pedicure semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '11.000' },
      { id:6, title: 'Cambio de manos y pies', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '35.000' }
    ];

    this.shoppingListRef$ = this.database.list('shopping-list-temp');
    // this.shoppingListRef$.subscribe( dta =>{
    //   console.log(dta);
    // });


    // this.database.list('shopping-list-temp').subscribe( (data) =>{
    //   this.fb_data = data;
    //   console.log(this.fb_data);
    //   // id: 1;
    //   // title: "perro";
    //   // checked: true;
    //   // description: "allakskasdkka";
    //   // value: 45210;
    // });

    // Mantener el check en los productos
    var dataGuardada:any = localStorage.getItem("userDataBuy");
    if ( dataGuardada === null) {

      console.log("NO esta el userData");
      this.data = {
        "wrk": "", "checked": "false"
      };
    }else{
      this.count = JSON.parse(dataGuardada).length;
      var dataGuardada = JSON.parse(dataGuardada);


    }


  }


  // Agregar elementos al carrito
  addItem(id, item, value, e){

    console.log(this.userId);
    this.obj_buy.push({
        id: id,
        title: item,
        price: value,
        checked: e
    });

    // localStorage.setItem('userDataBuy', this.data);
    // console.log(this.obj_buy);
    const shopping = JSON.stringify(this.obj_buy);
    // localStorage.setItem('userDataBuy', shopping_list_temp);
    console.log('--'+shopping);

    firebase.database().ref('shopping-list-temp/' + this.userId).set({
      shopping
    });


  }

    // Eliminar elementos al carrito
  removeItem(id){
    console.log("Longitud: "+this.obj_buy.length)
    // console.log("BBJEE "+this.obj_buy[0].id);
    for(let i = 0; i < this.obj_buy.length; i++) {
        if(this.obj_buy[i].id == id){
            this.obj_buy.splice(i, 1);
        }
    }

    const shopping = JSON.stringify(this.obj_buy);
    // localStorage.setItem('userDataBuy', newa);
    console.log('--'+shopping);
    console.log(this.obj_buy);

    firebase.database().ref('shopping-list-temp/' + this.userId).set({
      shopping
    });

  }

  notificationModal() {
   let contactModal = this.modalCtrl.create("NotificationsPage");
   contactModal.present();
  }

  perfilPage(){
    this.navCtrl.push('PerfilPage');
  }

  goToPage(page){
    this.redirectPage = page;
    this.navCtrl.push(this.redirectPage);
  }


  datachanged(id:number, item: any, value:any, e: any){
    console.log('ID:  '+ id);
    console.log('Valor del item '+ item);
    console.log('Valor del estado '+ e);

    if (e == true){
      this.addItem(id, item, value, e);
      this.count = this.obj_buy.length;

    }else{
      this.removeItem(id);
      this.count = this.obj_buy.length;
      // this.count =1;
    }
    console.log(this.count);

    // if ( dataGuardada === null) {
    // console.log("NO esta el userData");
    //
    //
  // this.data ={"wrk": item, "checked": e};
    // }
  // localStorage.setItem('userData', JSON.stringify(this.data));
  // if ( dataGuardada != null) {
  // var dataGuardada = JSON.parse(dataGuardada);
  //
  //   console.log('este es el valor de la data: '+dataGuardada.checked);
  //   console.log("si existe");


  //   this.data = {
  //     "wrk": dataGuardada.wrk, "checked": dataGuardada.checked
  //   };
  //
  //   console.log('Esto es dentro del if no null '+this.data.checked);
  // }
  //
  // var count = Object.keys(this.data.checked).length;
  // console.log(count);
  //
  // console.log("-------> "+count);


    // this.data = {
    //   "wrk": item, "checked": e
    // };

    // console.log(JSON.stringify(this.data));

  // return this.data


    // console.log(e);
  }


}
