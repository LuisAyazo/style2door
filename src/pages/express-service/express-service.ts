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
  marker: any;

  customLabe: any  = {
        Estilist: {
          label: 'R'
        },
        client: {
          label: 'B'
        }
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public googleMaps: GoogleMaps) {
      setTimeout(()=>{
        this.loadMap();
      }, 500);
  }


  loadMap(){

    // this.images_pin = 'assets/images/custom_marker.ico';
    this.images_pin = {
          // url: '../assets/images/MapMarker_Marker_Inside_Azure.png',
          url:'https://firebasestorage.googleapis.com/v0/b/style2door-180721.appspot.com/o/marker%2FMapMarker_Marker_Outside_Pink.png?alt=media&token=ad437041-cdf7-4a39-b0c0-dcf3146c722d',
          // This marker is 20 pixels wide by 32 pixels high.
          // size: new google.maps.Size(20, 32),
          scaledSize: new google.maps.Size(50, 50),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
    };
    // Ventana de informacion
    // var infoWindow = new google.maps.InfoWindow;


        // console.log(this.pos);
        // Tomar la referencia ID para el mapa
        this.map = new google.maps.Map(document.getElementById('map'), {
          center:this.pos,
          zoom: 16,
          // styles: [ // Estilo para el mapa
          //       {elementType: 'geometry', stylers: [{color: '#c0c1c3'}]},
          //       {elementType: 'labels.text.stroke', stylers: [{color: '#474747'}]},
          //       {elementType: 'labels.text.fill', stylers: [{color: '#e6e8ed'}]},
          //       {
          //         featureType: 'administrative.locality',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#d59563'}]
          //       },
          //       {
          //         featureType: 'poi',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#d59563'}]
          //       },
          //       {
          //         featureType: 'poi.park',
          //         elementType: 'geometry',
          //         stylers: [{color: '#263c3f'}]
          //       },
          //       {
          //         featureType: 'poi.park',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#6b9a76'}]
          //       },
          //       {
          //         featureType: 'road',
          //         elementType: 'geometry',
          //         stylers: [{color: '#38414e'}]
          //       },
          //       {
          //         featureType: 'road',
          //         elementType: 'geometry.stroke',
          //         stylers: [{color: '#212a37'}]
          //       },
          //       {
          //         featureType: 'road',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#9ca5b3'}]
          //       },
          //       {
          //         featureType: 'road.highway',
          //         elementType: 'geometry',
          //         stylers: [{color: '#746855'}]
          //       },
          //       {
          //         featureType: 'road.highway',
          //         elementType: 'geometry.stroke',
          //         stylers: [{color: '#1f2835'}]
          //       },
          //       {
          //         featureType: 'road.highway',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#f3d19c'}]
          //       },
          //       {
          //         featureType: 'transit',
          //         elementType: 'geometry',
          //         stylers: [{color: '#2f3948'}]
          //       },
          //       {
          //         featureType: 'transit.station',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#d59563'}]
          //       },
          //       {
          //         featureType: 'water',
          //         elementType: 'geometry',
          //         stylers: [{color: '#17263c'}]
          //       },
          //       {
          //         featureType: 'water',
          //         elementType: 'labels.text.fill',
          //         stylers: [{color: '#515c6d'}]
          //       },
          //       {
          //         featureType: 'water',
          //         elementType: 'labels.text.stroke',
          //         stylers: [{color: '#17263c'}]
          //       }
          //     ]
        });

        // handleLocationError(browserHasGeolocation, infoWindow, pos) {
        //  infoWindow.setPosition(pos);
        //  infoWindow.setContent(browserHasGeolocation ?
        //                        'Error: The Geolocation service failed.' :
        //                        'Error: Your browser doesn\'t support geolocation.');
        // }

    // let infoWindow = new google.maps.InfoWindow({map: this.map});

    this.geolocation.getCurrentPosition().then((position) => {
     this.pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
             };

             this.marker.setPosition(this.pos);
             this.map.setCenter(this.pos);
            //  this.marker.addListener('click', (event)=> {});
             this.marker.addListener('click', ()=> {
               this.toggleBounce
              //  infoWindow.open(this.map, this.marker);
              //  infoWindow.setPosition(this.pos);
              //  infoWindow.setContent('aqui');
             });

    }).catch((error) => {
      console.log('Error getting location', error);
      alert(error);
    });

    this.marker = new google.maps.Marker({
      map: this.map,
       draggable: true,
       animation: google.maps.Animation.DROP,
      // position: this.pos,
      icon: this.images_pin
    });


  // this.map.one(GoogleMapsEvent.MAP_READY)
  // .then(() => {
  //   console.log('Map is ready!');

    // Now you can use all methods safely.
    // this.map.addMarker({
    //     title: 'Ionic',
    //     icon: 'blue',
    //     animation: 'DROP',
    //     position: {
    //       lat: 43.0741904,
    //       lng: -89.3809802
    //     }
    //   })
    //   .then(marker => {
    //     marker.on(GoogleMapsEvent.MARKER_CLICK)
    //       .subscribe(() => {
    //         alert('clicked');
    //       });
    //   });

  // });




  }//loadMap




  toggleBounce() {
     console.log(this.marker);
     if (this.marker.getAnimation() !== null) {
       this.marker.setAnimation(null);
     } else {
       this.marker.setAnimation(google.maps.Animation.BOUNCE);
     }
  }

}
