import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Slides, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
// import { AngularFireDatabase  } from 'angularfire2/database';
// import * as firebase from 'firebase/app';
// import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
// import { Item } from '../../models/item/item.model';

import { NotificationsProvider } from '../../providers/notifications/notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-man',
  templateUrl: 'man.html',
})
export class ManPage {
  @ViewChild(Slides) slides: Slides;

  //firestore
  // private itemsCollection: AngularFirestoreCollection<any>;
  items: any;
  manicure: any;
  maquillaje: any;
  // a: Observable<any>;
  a: any;
  notifications: any;
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
  arrayTmp: any[];
  // itemCheckedFromFirebase: Observable<any>;
  itemCheckedFromFirebase: any[];
  _notifications: number = 0;
  delTmp: any;
  servicios: any[];
  ch: any[] = [];
  isenabled:boolean = false;
  buttonColor: any;
  misElementos : any;
  innerHtmlVar:any ;
  // = `<button ion-button (click)="self.alert('message')"></button>`


  // buttonDisabled:boolean = true;

  // item: Item = {
  //   name: '',
  //   quantity: 0,
  //   price: 0
  // }

  // itemMP: Array<{id: any, title: string, checked: any, description: string, value: any}>;
  // private userId;
  // shoppingListRef$: AngularFireList<ShoppingItem[]>;


  constructor(
    public navCtrl: NavController,
    // public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    // private database: AngularFireDatabase,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore,
    public notiPro: NotificationsProvider,
    public popoverCtrl: PopoverController,
    protected sanitizer: DomSanitizer,
    private toastCtrl: ToastController
  ) {
    // var strHTML = '<input type="text" name="name">';
    // this.innerHtmlVar = this.sanitizer.bypassSecurityTrustHtml(strHTML);

var disabled = false;
// this.addHTMLElements();

    this.angularFauth.authState.subscribe( data => {
          // this.authState = data;
          if(data == null){
            this.navCtrl.setRoot('LoginPage');
          }else{
            console.log('QUeeeee');
            // setTimeout(() => {
            // }, 5000);
          }
          console.log(data);
    });

              this.initAll();

      // Notificaciones no vistas
      // if(this.notiPro.getCurrentNotificationNoView().length > 0){
      //   this.notiPro.getCurrentNotificationNoView().subscribe(data => {
      //     console.log(data)
      //
      //     // this._notifications = data.length
      //
      //   });
      // }


  }

  assembleHTMLItem() {
    var strHTML = '<input type="text" name="name">';
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  addService(){

    let toast = this.toastCtrl.create({
        message: 'Servicio agregado a la canasta',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
  }

  // addHTMLElements(){
  //   for(var a of this.this.servicios){
  //   this.misElementos = `<ion-list no-lines *ngFor="let item of servicios; let i = index">
  //       <button full ion-button ><img src="assets/images/services/man/barba_de_lujo.jpg"/>
  //         <div class="detail_price" text-wrap>
  //           <h2>${item.nombre}</h2>
  //           <h6 >${item.precio}</h6>
  //           <h5><button clear ion-button icon-only (click)="detailInfoPopover($event,item)">- detalle </button></h5>
  //           <span class="favorites"><ion-icon color='googleplus-color' name="heart"></ion-icon></span>
  //
  //             <button class="add_cart" [disabled]="disabled" ion-button [ngStyle]="{'color': buttonColor}" (click)='addItem(item.id, item.nombre, item.precio)'>Solicitar</button>
  //         </div>
  //       </button>
  //     </ion-list>`
  //   }
  //
  // }



  initAll(){
          this.angularFauth.authState.subscribe( data => {
               if(data !== null){
                   this.angularFirestore.collection('servicios').doc('hombres').collection('servicios').valueChanges()
                   .subscribe( data => { this.servicios = data
                          // console.log(this.servicios);


                          for(var a of this.servicios){
                          this.misElementos += `<button full ion-button ><img src="assets/images/services/man/barba_de_lujo.jpg"/>
                                <div class="detail_price" text-wrap>
                                  <h2>${a.nombre}</h2>
                                  <h6 >${a.precio}</h6>
                                  <h5><button clear ion-button icon-only (click)="detailInfoPopover($event,item)">- detalle </button></h5>
                                  <span class="favorites"><ion-icon color='googleplus-color' name="heart"></ion-icon></span>
                                  <button class="add_cart" [disabled]="disabled" ion-button [ngStyle]="{'color': buttonColor}" (click)='addItem(item.id, item.nombre, item.precio)'>Solicitar</button>
                                </div>
                              </button>`
                          }

                          // return this.misElementos;
                          // var strHTML = '<input type="text" name="name">';
                          this.innerHtmlVar = this.sanitizer.bypassSecurityTrustHtml(this.misElementos);


                        }
                      );
                }

          });






       this.angularFauth.authState.subscribe( data => {
           if(data){
             console.log("hay data");
             this.angularFirestore.collection('users').doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
               .subscribe(data => {
                  // this.itemCheckedFromFirebase = [];
                   console.log("que hay"+ JSON.stringify(data));
                   this.itemCheckedFromFirebase = data;
                   console.log(this.itemCheckedFromFirebase);
                  //  if(this.itemCheckedFromFirebase.length<1){
                  //    console.log("NO HAY NADA EN EL CARRITO");
                  //  }else{
                  //    console.log("HAYYYYY COSAS");
                  //  }

                 }

               )
           }
       });

       // Traer todos los servicios de manicure
       this.angularFauth.authState.subscribe( data => {
           if(data !== null){
               this.angularFirestore.collection('servicios').doc('mujeres').collection('manicure-pedicure').valueChanges()
               .subscribe( data => { this.manicure = data
                      // console.log(this.manicure);
                    }
                  );
            }

      });
      //
      this.angularFauth.authState.subscribe( data => {
        // conso
          if(data !== null){
              this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
              .subscribe(count =>{this.count = count.length});
          }

      });
  }

  // isChecked(item){
  //
  //   console.log('rrrr' +item + item.nombre);
  //   console.log('llll '+this.itemCheckedFromFirebase);
  //   for(let a in this.itemCheckedFromFirebase){
  //     console.log('vvvvv '+ a);
  //   }
  /**  */
  // }

  ionViewDidLoad() {


          // Notificaciones no vistas
          if(this.notiPro.getCurrentNotificationNoView() !== null){
            this.notiPro.getCurrentNotificationNoView().subscribe(data => {this._notifications = data.length });
          }

          // Notifications
          this.notiPro.getNotificationsData().subscribe(data =>{this.notifications=data.length});
          // .subscribe(
          //   count =>{
          //          this.Notifications = count.length;
          //          console.log(count);
          //   });
          //  console.log('w '+this.notifications);


  }




  // ngAfterViewInit() {
  //     this.slides.freeMode = true;
  // }

  // carrito de compra
  cartShoppingModal(){
    let modal = this.modalCtrl.create("CartPage");
    modal.present();
  }


  datachanged(item,  e: any){
    console.log('ID:  '+ item.id);
    console.log('Valor del item '+ item.nombre);
    console.log('precio '+ item.precio);
    console.log(JSON.stringify(e));
    console.log(JSON.stringify(item.id));

    // console.log('Cucumbers new state:' + item.name)

    // if ((e.originalEvent.isTrusted === true && e.originalEvent.isPrimary === undefined) || e.originalEvent.isPrimary === true){
    // if(this.datachangedClicked){
      if(e == true){
        // console.log('added');
        // console.log('SIiiiiiii TRUSTED');
        this.addItem(item.id, item.nombre, item.precio, e);
      }else{
        // console.log('removed');
        // console.log('nooooooo TRUSTED');
        // setTimeout(() => {
        // console.log(this.itemCheckedFromFirebase);
        // console.log(Object.keys(item));
        //   console.log(JSON.stringify(item));
          this.removeItem(item);
          // item = []
          // name = [];
        // }, 1000);
        // this.count = this.obj_buy.length;
        // this.count =1;
      }
      // console.log(Object.keys(item));
        // console.log(JSON.stringify(item));
      // this.count = this.obj_buy.length;
    // }
    // console.log(this.count);

  }

  // Agregar elementos al carrito
  addItem(id, name, price, e){
    // this.buttonColor = '#345465'; //desired Color
    // console.log('chamging button color');

    // this.disabled = true;
    // console.log(this.userId);
    let item_to_send = {
        id: id,
        nombre: name,
        precio: price,
        disabled: 'true',
        cantidad: 1
    };
    console.log(item_to_send);

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
  removeItem(item){
    // console.log(name);
    // console.log("Longitud: "+this.obj_buy.length)
    // console.log("BBJEE "+this.obj_buy[0].id);
    // for(let i = 0; i < this.itemCheckedFromFirebase.length; i++) {
    //     if(this.itemCheckedFromFirebase[i].id == item.id){
    //         this.arrayTmp = this.itemCheckedFromFirebase.splice(i, 1);
    //     }
    // }
    //
    // console.log(this.arrayTmp);

 //      var result = this.itemCheckedFromFirebase.filter((val) => {
 //        for (var i = 0; i < item.id.length; i++)
 //            if (val.indexOf(item.id[i]) == -1){
 //                return false;
 //            }else{
 //                this.itemCheckedFromFirebase.splice(i, 1);
 //            }
 //        return true;
 //    });
 // console.log(Object.keys(index));



    // const shopping_list_temp = this.obj_buy;
    // localStorage.setItem('userDataBuy', newa);
    // console.log('--'+shopping);
    // console.log(this.obj_buy);
    // this.shirtCollection = angularFirestore.collection<Shirt>('shirts');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.


    this.angularFauth.authState.subscribe( data => {
      // conso
        if(data !== null){
          // console.log(JSON.stringify(item.nombre));
          // console.log('sera eliminado!')
          // console.log("Valida nombre "+ item.nombre);
          // try{
          //   let pshirts = this.angularFirestore.collection('users').doc(`${data.uid}`).collection('shopping_list_temp').snapshotChanges().map(actions => {
          //     return actions.map(a => {
          //       const data = a.payload.doc.data();
          //       const id = a.payload.doc.id;
          //       return({ id, ...data });
          //     });
          //   });

            // let pshirts = this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges();

            // pshirts.subscribe(bs =>{
            //   console.log(bs)
            //   this.index = bs.findIndex((itemp) => itemp['id'] === item.id);
            //    console.log('uuuuu= '+this.index)
            //   console.log(bs);
            //   console.log(bs[this.index]);
            //   // // }, 1000);
            //   if(this.index !== -1 ){
            //     this.delTmp = bs.splice(this.index, 1, bs[this.index]['nombre'])
            //     // this.delTmp = bs[this.index]['nombre'];
            //   }
            //   console.log(this.delTmp);
            //   console.log('mmm');
            //   if(this.delTmp != undefined){
            //     console.log('dentro '+this.delTmp);

                // if(this.index !== -1 ){
                this.angularFirestore.collection('users').doc(`${data.uid}`).collection('shopping_list_temp').doc(item.nombre).delete()
                .then(function() {
                  console.log("Document successfully ELIMINADO! ");
                }).catch(function(error) {
                  console.error("Error DELETING document: ", error);
                });
                // }
              // }
          //   });
          //     // console.log('---- '+this.delTmp);
          //     // setTimeout(() => {
          //   // this.angularFirestore.collection('users').doc(`${data.uid}`).collection('shopping_list_temp', ref => ref.where("id", "==", this.delTmp[index]['id'])).doc(this.delTmp[index]['nombre']).delete();
          //
          //   // return this.angularFirestore.collection('users').doc(this.currentUserId).collection('notifications', ref => ref.where("view", "==", false)).valueChanges();
          // }
          // catch(e){
          //   console.error(e);
          // }// this.angularFirestore.collection('servicios/mujeres/manicure-pedicure').doc(name).update({
          // //     "checked": false
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

detailInfoPopover(myEvent, data){
  let popover = this.popoverCtrl.create('DetailServicePage',{infopopover:data});
    popover.present({
      ev: myEvent
    });
  }


}
