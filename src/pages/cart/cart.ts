import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private database: AngularFireDatabase,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore

  ) {
    this.total = 0;
    this.com();

    this.angularFauth.authState.subscribe( data => {
        // conso
          if(data.uid){
              this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('shopping_list_temp').valueChanges()
              .subscribe(count =>{this.count = count.length});
          }

    });

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
                  // this.total = 0;
                  // var total_tmp = 0;
                  // total_tmp += this.all_article_to_buy[a].precio *  this.all_article_to_buy[a].cantidad;
                  // console.log(this.all_article_to_buy[a].precio *  this.all_article_to_buy[a].cantidad);
                  // console.log('operacion '+ total_tmp);
                  // 7500*4
                  this.hours[a] = this.all_article_to_buy[a].precio *  this.all_article_to_buy[a].cantidad;
                  console.log(this.hours);

                  // 13822*2
                  // this.total += total_tmp ;
                  // console.log("Actual valor --> "+ total_tmp);
                  // this.all_article_to_buy[a].shift();
                }
                // console.log('Antes '+ this.total);

                for(let sum_total in this.hours){
                  this.total += this.hours[sum_total];
                  console.log(this.total);
                }
                this.hours = [];
                // this.total += total_tmp;
                // console.log('Total:  '+ this.total);
                // this.total += this.total;
              }
            }
          )

        }
    });
  }

}
