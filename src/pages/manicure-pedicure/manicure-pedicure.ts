import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-manicure-pedicure',
  templateUrl: 'manicure-pedicure.html',
})

export class ManicurePedicurePage {

  manicure: boolean;
  text: any;
  aja: any;
  data: any;
  groceries: any;
  badgeNumber: any = 0;

  itemMP: Array<{id: any, title: string, checked: any, description: string, value: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.itemMP = [
      { id:1, title: 'Manicure', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '14.500'},
      { id:2, title: 'Pedicure', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '17.800' },
      { id:3, title: 'Remocion semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '10.000' },
      { id:4, title: 'Manicure semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '12.600' },
      { id:5, title: 'Pedicure semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '11.000' },
      { id:6, title: 'Cambio de manos y pies', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '35.000' }

    ];


    this.groceries = [
                'Bread',
                'Milk',
                'Cheese',
                'Snacks',
                'Apples',
                'Bananas',
                'Peanut Butter',
                'Chocolate',
                'Avocada',
                'Vegemite',
                'Muffins',
                'Paper towels'
            ];

      var dataGuardada:any = localStorage.getItem("userData");
      if ( dataGuardada === null) {
      console.log("NO esta el userData");

      this.data = {
        "wrk": "", "checked": "false"
      };
    }else{
        var dataGuardada = JSON.parse(dataGuardada);
        this.data = {
          "wrk": dataGuardada.wrk, "checked": dataGuardada.checked
        };
        // console.log(this.data.checked);
    }


    }

    // ngOnInit(){
    //   var dataGuardada:any = localStorage.getItem("userData");
    //   if ( dataGuardada === null) {
    //   console.log("NO esta el userData");
    //
    //
    //   this.data = {
    //     "wrk": "", "checked": "false"
    //   };
    // }
    // else{
    //   var dataGuardada = JSON.parse(dataGuardada);
    //
    //   console.log('este es el valor de la data: '+dataGuardada.checked);
    //   console.log("si existe");
    //
    //
    //   this.data = {
    //     "wrk": dataGuardada.wrk, "checked": dataGuardada.checked
    //   };
    //
    //   console.log(this.data.checked);
    // }

    //
    // if("username" in localStorage){
    //   alert('yes');
    // } else {
    //   alert('no');
    // }


    // if (localStorage["username"]) {
    //
    // }


  //   var personita = localStorage.getItem('userData');
  //   // console.log(typeof personita);
  //
  //   var personaGuardada = JSON.parse(personita);
  //   // console.log(personaGuardada.state);
  //
  //   return this.data;
  //
  // }


  // this.aja

  updateCucumber(name:string) {
  // console.log(name +' new state:' + this.data);
  }

  textChanged(name:any, value) {
      console.log('changed', this.text, value);
      this.text=value;                          //<<<###added



      // localStorage.setItem('userData', JSON.stringify(this.data));
      // console.log(JSON.stringify(this.data));
      console.log('valor real '+ value);
      // console.log('Nombre de esto:' + algo);
  }

  datachanged(item: any, e: any){
    console.log('Valor del item '+ item)
    console.log('Valor del estado '+ e);


    // if ( dataGuardada === null) {
    // console.log("NO esta el userData");
    //
    //
    this.data ={"wrk": item, "checked": e};
    // }
  localStorage.setItem('userData', JSON.stringify(this.data));
  if ( dataGuardada != null) {
  var dataGuardada = JSON.parse(dataGuardada);

    console.log('este es el valor de la data: '+dataGuardada.checked);
    console.log("si existe");


    this.data = {
      "wrk": dataGuardada.wrk, "checked": dataGuardada.checked
    };

    console.log('Esto es dentro del if no null '+this.data.checked);
  }

  var count = Object.keys(this.data.checked).length;
  console.log(count);

  console.log("-------> "+count);


    // this.data = {
    //   "wrk": item, "checked": e
    // };

    // console.log(JSON.stringify(this.data));

 return this.data


    // console.log(e);
}

  //
  // dataChoseByUser(){
  //   return window.localStorage.getItem('userData');
  // }




  // detalle(detail:any){
  //   console.log('esto trajoooo '+ detail);
  //
  // }

}
