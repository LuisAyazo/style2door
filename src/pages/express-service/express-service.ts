import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-express-service',
  templateUrl: 'express-service.html',
})
export class ExpressServicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public googleMaps: GoogleMaps, public platform:Platform) {
    platform.ready().then(() => {
        // this.loadMap();
        this.obtenerPosicion();
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ExpressServicePage');
  }


    obtenerPosicion():any{
      this.geolocation.getCurrentPosition().then(response => {
        this.loadMap(response);
      })
      .catch(error =>{
        console.log(error);
      })
    }

    loadMap(postion: Geoposition){
    let latitude = postion.coords.latitude;
    let longitud = postion.coords.longitude;
    console.log(latitude, longitud);

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // create LatLng object
    let myPosition: LatLng = new LatLng(latitude,longitud);

    // create CameraPosition
    let position = {
      target: myPosition,
      zoom: 18,
      tilt: 30
    };

    map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      let markerOptions: MarkerOptions = {
        position: myPosition,
        title: 'Here'
      };
      map.addMarker(markerOptions);
    });

  }


}
