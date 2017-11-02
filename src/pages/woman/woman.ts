import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
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
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: any;
  manicure: any;
  maquillaje: any;
  // a: Observable<any>;
  a: any;

  dataFromfirebaseService: any;
  p: any[] = [];
  public loader;
  chk_service: boolean;
  redirectPage:any;
  z: any; // Definir e inicializar array en blanco
  data: any;
  count: number;
  fb_data: any = [];
  itemMP: any;
  keys: string[];
  // itemCheckedFromFirebase: Observable<any>;
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

        this.itemsCollection = this.angularFirestore.collection<any>('servicios/mujeres/manicure-pedicure');
        this.itemsCollection.valueChanges().subscribe(
           (data) =>
           {
             this.manicure = data;
            //  console.log(this.manicure);
           }
         );

         this.angularFauth.authState.subscribe( data => {
           // conso
             if(data.uid){

               // console.log(this.itemCheckedFromFirebase[0].nombre);
               this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
               // if(this.itemCheckedFromFirebase == 'undefined' ){
               //   this.count = 0
               // }
                 .subscribe(
                   data => {
                     // console.log(data);
                     this.itemCheckedFromFirebase = data;
                    //  console.log(this.itemCheckedFromFirebase[0].nombre);

                     for(let al in this.itemCheckedFromFirebase){
                       console.log(this.itemCheckedFromFirebase[al].nombre);
                      //  let p = {
                      //
                      //  }
                     }
                     // this.count = data.length;
                   }
                 )
             }
         });

    this.angularFauth.authState.subscribe( data => {
      // conso
        if(data.uid){
            this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
            .subscribe(count =>{this.count = count.length});
        }

    });
  }

  isChecked(item){

    console.log('rrrr' +item + item.nombre);
    console.log('llll '+this.itemCheckedFromFirebase);
    for(let a in this.itemCheckedFromFirebase){
      console.log('vvvvv '+ a);
    }

  }

  ionViewDidLoad() {

     // );
    //  this.itemsCollection = this.angularFirestore.collection<any>('servicios/mujeres/maquillaje');
    //  this.itemsCollection.valueChanges().subscribe(
    //     (data) =>
    //     {
    //       this.maquillaje = data;
    //       // console.log(this.maquillaje);
     //
    //     }
    //   );
    //


      // console.log("Item  proveniente de firebase checked " + JSON.stringify(this.itemCheckedFromFirebase));
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
  addItem(id, name, price, e){

    // console.log(this.userId);
    let item_to_send = {
        id: id,
        nombre: name,
        precio: price,
        checked: e,
        cantidad: 1
    };

    // this.obj_buy.push(item_to_send);

    // localStorage.setItem('userDataBuy', this.data);
    // console.log(this.obj_buy);
    // const shopping_list_temp = this.obj_buy;
    // localStorage.setItem('userDataBuy', shopping_list_temp);
    // console.log('--'+shopping_list_temp);

    this.angularFauth.authState.subscribe( data => {
      // conso
        if(data.uid){

          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(name).set(item_to_send)
          .then(function() {
              console.log("Document successfully seteado! ");
          }).catch(function(error) {
              console.error("Error setting document: ", error);
          });

          // this.angularFirestore.collection('servicios/mujeres/manicure-pedicure').doc(name).update({
          //     "checked": true
          // })slidesPerView=2 spaceBetween=8 speed=300
          // id = [];
          // item_to_send.id = [];
          // this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges();


        }
    });


  }

    // Eliminar elementos al carrito
  removeItem(name){
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
          console.log("Valida nombre "+ name);
          this.angularFirestore.collection('users').doc(`${data.uid}`).collection('shopping_list_temp').doc(name).delete();
          // this.angularFirestore.collection('servicios/mujeres/manicure-pedicure').doc(name).update({
          //     "checked": false
          // });
          // .then(function() {
          //     console.log("Document successfully deleted! ");
          // }).catch(function(error) {
          //     console.error("Error removing document: ", error);
          // });

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

          // AL parecer es para eliminar doc sacando el id --- falta agregar la parte del borrado
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


  datachanged(id, name, price,  e: any){
    console.log('ID:  '+ id);
    console.log('Valor del item '+ name);
    console.log('precio '+ price);
    console.log('Valor del estado '+ e);

    // console.log('Cucumbers new state:' + item.name)

    if (e){
      this.addItem(id, name, price, e);
      // this.count = this.obj_buy.length;

    }else{
      this.removeItem(name);
      // this.count = this.obj_buy.length;
      // this.count =1;
    }
    // console.log(this.count);

  }


}
