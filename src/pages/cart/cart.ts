import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NotificationsProvider } from '../../providers/notifications/notifications';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  checkout: any = "currentOrder";
  article:  any[]; // Definir e inicializar array en blanco
  peopleNumber:number =0;
  public total: number;
  all_article_to_buy: any;
  public hours: number[] = [];
  count: number;
  _notifications: number = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    // private database: AngularFireDatabase,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore,
    public notiPro: NotificationsProvider
  ) {

    // let email = "https:%8%8firebasestorage.googleapis.com%8v0%8b%8style2door-180721.appspot.com%8o%8services_img%2Fmaquillaje%2FWhatsApp%20Image%202017-11-22%20at%201.05.05%20PM.jpeg?alt=media&token=fa415fe2-43a2-4926-b435-0621d80f23f4"
    //             //  https://firebasestorage.googleapis.com/v0/b/style2door-180721.appspot.com/o/services/img%2Fmaquillaje%2FWhatsApp%20Image%202017-11-22%20at%201.05.05%20PM.jpeg?alt=media&token=fa415fe2-43a2-4926-b435-0621d80f23f4
    //             //  https://firebasestorage.googleapis.com/v0/b/style2door-180721.appspot.com/o/services_img%2Fmaquillaje%2FWhatsApp%20Image%202017-11-22%20at%201.05.05%20PM.jpeg?alt=media&token=fa415fe2-43a2-4926-b435-0621d80f23f4
    // let re = /\%8/gi;
    // let result = email.replace(re, "/");
    // console.log(result)

    this.total = 0;
    this.com();

    this.angularFauth.authState.subscribe( data => {
        // conso
          if(data.uid){
              this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
              .subscribe(count =>{this.count = count.length});
          }

    });

    if(this.notiPro.getCurrentNotificationNoView() !== null){
      this.notiPro.getCurrentNotificationNoView().subscribe(data => {this._notifications = data.length });
    }

  }

  ngAfterViewInit() {
    this.totalOrder();
  }

  com() {
    this.angularFauth.authState.subscribe( data => {
      if(data.uid){
        // this.article =
        this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
        .subscribe(
          data => {
            this.article = data;


            console.log(this.article)
        });
      }
    });

  }

  removePeople(elem, index): void{
    let cant_add: number;
    console.log('numero actual recibido '+elem.cantidad);
    if(elem.cantidad <= 1){
      console.log("eliminar card");
      this.angularFauth.authState.subscribe( data => {
        if(data.uid){
          console.log("item a eliminar -->>>" + index);

          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(elem.nombre).delete().then(function() {
              console.log("Document successfully deleted!");
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

          // firebase.database().ref('users/' + data.uid+'/shopping_list_temp/'+index).remove();
          // for(let i = 0; i < this.obj_buy.length; i++) {
          //     if(this.obj_buy[i].id == index){
          //         this.obj_buy.splice(i, 1);
          //     }
          // }
        }
      });
    }else{
      cant_add = elem.cantidad - 1;
      console.log("PASO POR AQUI 2");
      this.angularFauth.authState.subscribe( data => {
        if(data.uid){
          // firebase.database().ref('users/' + data.uid+'/shopping_list_temp/'+index+'/').child("cantidad").set(cant_add);
          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(elem.nombre).update({
              "cantidad": cant_add,
          })
          .then(function() {
              console.log("Document successfully updated!");
          });
        }
      });
    }
    // this.totalOrder();
  }


  addPeople(elem,index): void  {
    let cant_add = 0;
    cant_add = elem.cantidad +1;
    this.angularFauth.authState.subscribe( data => {
    if(data.uid){

        // firebase.database().ref('users/' + data.uid+'/shopping_list_temp/'+index+'/').child("cantidad").set(cant_add);
        this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').doc(elem.nombre).update({
            "cantidad": cant_add,
        })
        .then(function() {
            console.log("Document successfully updated!");
        });
        // firebase.database().ref('users/' + data.uid+'/shopping_list_temp/'+index+'/').on('value', (snapshot) => {
        //
        //   console.log(snapshot.val());
        //   // var key = Object.keys(snapshot.val());
        //   // console.log(key);
        //
        // });
      }
    });
    // this.totalOrder();

  }

  totalOrder(): void{
    this.angularFauth.authState.subscribe( data => {
      if(data.uid){

          // firebase.database().ref('users/' + data.uid+'/shopping_list_temp/'+index+'/').child("cantidad").set(cant_add);
          this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges().subscribe(
            items => {
              this.total = 0;
              this.all_article_to_buy = items;
              // console.log( ' - ' + this.all_article_to_buy.length);
              if(this.all_article_to_buy.length > 0){
                for(let a = 0; a<this.all_article_to_buy.length; a++){
                  console.log(a);

                  this.hours[a] = this.all_article_to_buy[a].precio *  this.all_article_to_buy[a].cantidad;
                  console.log(this.hours);
                }


                for(let sum_total in this.hours){
                  this.total += this.hours[sum_total];
                  console.log(this.total);
                }
                this.hours = [];

              }
            }
          )

        }
    });
  }

}
