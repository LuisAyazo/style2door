import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

declare var google;

@IonicPage()
@Component({
  selector: 'page-express-service',
  templateUrl: 'express-service.html',
})
export class ExpressServicePage {
  map: any;
  images_pin: any;
  pos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public googleMaps: GoogleMaps, public platform:Platform) {
    // platform.ready().then(() => {
      setTimeout(()=>{
        this.loadMap();

      }, 500);
    //     this.obtenerPosicion();
    // });
  }


  loadMap(){
    this.images_pin = '../../assets/images/custom_marker.ico';
    this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -33, lng: 151},
            zoom: 15
          });

    let beachMarker = new google.maps.Marker({
          position: this.pos,
          map: this.map,
          icon: this.images_pin
        });
          let infoWindow = new google.maps.InfoWindow({map: this.map});

          var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=> {
              this.pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              infoWindow.setPosition(this.pos);
              infoWindow.setContent(this.images_pin);
              this.map.setCenter(this.pos);
            }, function() {
              this.handleLocationError(true, infoWindow, this.map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, this.map.getCenter());
          }
  }

         handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
        }




}
