import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Item } from '../../models/item/item.model';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-woman',
  templateUrl: 'woman.html',
})
export class WomanPage {
  @ViewChild(Slides) slides: Slides;

  //firestore
  private itemsCollection: AngularFirestoreCollection<any>;
  items: any;


  public loader;
  chk_service: boolean;
  redirectPage:any;
  obj_buy: any[] = []; // Definir e inicializar array en blanco
  data: any;
  count: number;
  fb_data: any = [];
  itemMP: any;
  itemCheckedFromFirebase: any;
  // item: Item = {
  //   name: '',
  //   quantity: 0,
  //   price: 0
  // }

  // itemMP: Array<{id: any, title: string, checked: any, description: string, value: any}>;
  private userId;
  // shoppingListRef$: AngularFireList<ShoppingItem[]>;


  constructor(
    public navCtrl: NavController,
    // public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private database: AngularFireDatabase,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore
  ) {

    this.angularFauth.authState.subscribe( data => {
      // conso
        if(data.uid){
          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges().subscribe(
            data => {
              console.log(data.length);
              this.itemCheckedFromFirebase = data;
              this.count = data.length;
              // console.log(data);
              // for (var entry of data) {
              //     console.log(entry.checked); // 1, "string", false
              // }
            }
          )
        }
    });
  }

  ngOnInit() {

      this.itemsCollection = this.angularFirestore.collection<any>('servicios/mujeres/manicure-pedicure');
      this.itemsCollection.valueChanges().subscribe(
        (data) =>
        {
          this.items = data;
          // console.log(data);

        }
      // ,
      //   (error) =>
      //   console.log(error)
      );


  }




  ngAfterViewInit() {
      this.slides.freeMode = true;
  }

  // carrito de compra
  cartShoppingModal(){
    let modal = this.modalCtrl.create("CartPage");
    modal.present();
  }

  // Agregar elementos al carrito
  addItem(item, e){

    // console.log(this.userId);
    let item_to_send = {
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        checked: e,
        cantidad: 1
    };

    this.obj_buy.push(item_to_send);

    // localStorage.setItem('userDataBuy', this.data);
    // console.log(this.obj_buy);
    // const shopping_list_temp = this.obj_buy;
    // localStorage.setItem('userDataBuy', shopping_list_temp);
    // console.log('--'+shopping_list_temp);

    this.angularFauth.authState.subscribe( data => {
      // conso
        if(data.uid){
          // firebase.database().ref('users/' + data.uid).set({
          //   shopping_list_temp
          // });

          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(item.nombre).set(item_to_send);
          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges();
          // .subscribe(
          //   data => {
          //     console.log(data.length);
          //     this.count = data.length;
          //   }
          // )

          // this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(item.nombre).update({
          //     "checked": true,
          // })
          // .then(function() {
          //     console.log("Document successfully updated!");
          // });


        }
    });


  }

    // Eliminar elementos al carrito
  removeItem(item){
    // console.log("Longitud: "+this.obj_buy.length)
    // console.log("BBJEE "+this.obj_buy[0].id);
    // for(let i = 0; i < this.obj_buy.length; i++) {
    //     if(this.obj_buy[i].id == item.id){
    //         this.obj_buy.splice(i, 1);
    //     }
    // }

    // const shopping_list_temp = this.obj_buy;
    // localStorage.setItem('userDataBuy', newa);
    // console.log('--'+shopping);
    // console.log(this.obj_buy);
    this.angularFauth.authState.subscribe( data => {
      // conso
        if(data.uid){
          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(item.nombre).delete().then(function() {
              console.log("Document successfully deleted!");
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

          // this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges().subscribe(
          //   data => {
          //     console.log(data.length);
          //
          //     this.count = data.length;
          //
          //   }
          // )

          // this.angularFirestore.collection('servicios' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(item.nombre).update({
          //     "checked": false,
          // })
          // .then(function() {
          //     console.log("Document successfully updated!");
          // });

          // AL parecer es para eliminar doc con sacando el id --- falta agregar la parte del borrado
          // this.itemsCollection = this.angularFirestore.collection<any>('user').doc(`${data.uid}`).collection('shopping_list_temp');
          //   this.itemsCollection.snapshotChanges().map(actions => {
          //     return actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       // return { id, ...data };
          //       console.log(id,data);
          //     });
          //   })

        }

    });


  }

  notificationModal() {
   let contactModal = this.modalCtrl.create("NotificationsPage");
   contactModal.present();
  }

  // perfilPage(){
  //   this.navCtrl.push('PerfilPage');
  // }

  // goToPage(page){
  //   this.redirectPage = page;
  //   this.navCtrl.push(this.redirectPage);
  // }


  datachanged(item:any, e: any){
    console.log('ID:  '+ item.id);
    console.log('Valor del item '+ item.nombre);
    console.log('Valor del estado '+ e);

    if (e == true){
      this.addItem(item, e);
      // this.count = this.obj_buy.length;

    }else{
      this.removeItem(item);
      // this.count = this.obj_buy.length;
      // this.count =1;
    }
    // console.log(this.count);

  }


}
