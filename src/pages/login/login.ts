import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, LoadingController } from 'ionic-angular';
// import { Http, Response } from '@angular/http';
// provider
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    responseData : any;
    // userData = {"username": "","password": ""};
    public userData;
    // var fb
    public msgToast: string;
    public loader;
    isLoggedIn: boolean = false;
    authResponse: any;
    apiBaseUrl: string = "http://style2door.com/ws/api.php";
    posts: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public  menu: MenuController,
    public fb: Facebook,
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    // public http: Http
  ) {

    this.menu.swipeEnable(false);// deshabilita el sidemenu

  }

  // login(){
  //    this.authService.postData(this.userData,'login').then((result) => {
  //     this.responseData = result;
  //     console.log(this.responseData);
  //     localStorage.setItem('userData', JSON.stringify(this.responseData));
  //     this.navCtrl.setRoot("HomePage");
  //   }, (err) => {
  //     console.log(err);
  //   });
  //
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.setRoot('RegisterPage');
  }

  login(){
      console.log("Going Home");
      this.navCtrl.setRoot('TabsHomePage');
  }

  loginFb(){
      let permissions = new Array<string>();
      permissions = ['public_profile', 'user_friends', 'email'];
      // this.fb.getLoginStatus().then((response) => {
        // if (response.status === 'connected') {
        //   console.log('Already Logged in.');
        //   this.navCtrl.setRoot('HomePage');
        // }
        // else {
          this.fb.login(permissions).then((response: FacebookLoginResponse) => {
             let userId = response.authResponse.userID;
             let params = new Array<string>();

             // console.log(JSON.stringify(response.authResponse.accessToken));
            if (response.authResponse.accessToken){
              console.log("si hay token");

            }// if response.authResponse.accessToken
            else{
              console.log("nada de nada");
            }

            this.fb.api("me?fields=id,cover,name,first_name,last_name,email,age_range,link,gender,locale,picture,timezone,updated_time,verified", params)
            .then((profile) => {

            //  this.fb.api("me?fields=id,cover,name,first_name,last_name,email,age_range,link,gender,locale,picture,timezone,updated_time,verified,birthday,about,education,devices", params).then(function(profile) {
              // this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
              profile.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
// var algo = "mensaje de prueba"

                this.userData = JSON.stringify({
                api_username : "appv1",
                api_password: "76QNBOblSP",
                api_task: "user_register",
                facebook_id: profile['id'],
                cover: profile['cover']['source'],
                name: profile['name'],
                first_name: profile['first_name'],
                last_name: profile['last_name'],
                email: profile['email'],
                age_range:  profile['age_range']['min'],
                link: profile['link'],
                gender: profile['gender'],
                locale: profile['locale'],
                picture: profile.picture,
                timezone: profile['timezone'],
                updated_time: profile['updated_time'],
                verified: profile['verified']
              });

              // console.log(userData);



              window.localStorage.setItem("facebook_profile", JSON.stringify(profile)); // Almacenar datos del facebook en el localStorage
              // Muestra mensaje con loader al momento de autenticar
              this.loader = this.loadingCtrl.create({
                  content: "Autenticando...!",
                  dismissOnPageChange: true
                  //duration: 3000    });
                });
              this.loader.present();
              this.auth.loginAuth(this.userData).subscribe(data => {
                // console.log("proandoooooo "+JSON.stringify(this.userData));
                console.log("retorno de la base de datos ->>> "+JSON.stringify(data));
                this.navCtrl.setRoot("TabsHomePage", {}, {animate: true, direction: 'forward'});
                // if(data.succes === 'exitoso'){
                //   //this.loader.dismiss();
                //   console.log("tiene q entrar al login ....");
                //   this.navCtrl.setRoot(MyApp, {}, {animate: true, direction: 'forward'});
                // }
              }, err =>{
                  this.msgToast = err;
                  //FormLogin.username = '';
                  let toast = this.toastCtrl.create({
                    message: this.msgToast,
                    duration: 3500
                  })
                  toast.present();
                }, () => {
                  console.log('getData completed');
                })//FIN auth



              // this.nativeStorage.setItem('profile',
              // {
              //   name: profile.name,
              //   gender: profile.gender,
              //   picture: profile.picture
              // })
              // .then(function(){
              //   // console.log(JSON.stringify(profile.email));
              //   console.log("fullllll")
              // }, function (error) {
              //   alert(JSON.stringify(error));
              //   console.log(JSON.stringify(error));
              // })

              // this.nativeStorage.setItem('facebook_profile',
              // {
              //   id: profile.id,
              //   cover: profile.cover,
              //   name: profile.name,
              //   first_name: profile.first_name,
              //   last_name: profile.last_name,
              //   email: profile.email,
              //   age_range: profile.age_range,
              //   gender: profile.gender,
              //   picture: profile.picture,
              //   devices: profile.devices
              // })
              // .then(
              //   () => console.log('Stored item!'),
              //   error => console.error('Error storing item', error)
              // );

              // alert('Logged in Successfully!');

              // console.log(JSON.stringify(response.authResponse.accessToken));
              // console.log(JSON.stringify(response.authResponse.userID));
              // console.log(profile);
              // console.log(JSON.stringify(profile.cover.source));
              // console.log(JSON.stringify(profile.picture.data.url));

// console.log(algo);


            // console.log(this.apiBaseUrl);


            // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
            //     this.posts = data.data.children;
            // });
            // return this.http.post("http://style2door.com/ws/api.php", JSON.stringify({
            //             api_username : "appv1",
            //             api_password: "76QNBOblSP",
            //             api_task: "user_register",
            //             facebook_id: profile['id'],
            //             cover: profile['cover']['source'],
            //             name: profile['name'],
            //             first_name: profile['first_name'],
            //             last_name: profile['last_name'],
            //             email: profile['email'],
            //             age_range:  profile['age_range']['min'],
            //             link: profile['link'],
            //             gender: profile['gender'],
            //             locale: profile['locale'],
            //             picture: profile.picture,
            //             timezone: profile['timezone'],
            //             updated_time: profile['updated_time'],
            //             verified: profile['verified']
            //             })
            // ).subscribe(data => {
            //   console.log("jjjjjj ->>> "+JSON.stringify(data));
            // }, error => {
            //   console.log("Oooops!");
            // });//fin http.post


            })
            // this.navCtrl.setRoot('TabsHomePage');

            // alert('Logged in Successfully!');
            // alert(JSON.stringify(response.authResponse.accessToken));
            // alert(JSON.stringify(response.authResponse.userID));
            // console.log(JSON.stringify(profile.));
            // this.authResponse = response.authResponse;
            // this.isLoggedIn = true;




          }, (error) => {
            console.log(error);
            alert(JSON.stringify(error));
            // console.log(JSON.stringify(error));
         });
      //  }
      // });






  }

}
