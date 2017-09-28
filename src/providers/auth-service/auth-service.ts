import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';


// let apiBaseUrl = "http://localhost/api/v1/";


@Injectable()
export class AuthServiceProvider {
  apiBaseUrl = "http://style2door.com/";

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  loginAuth(data){
      //console.log(this.baseUrl+'api/v1/auth----->' +data);
      return this.http.post(this.apiBaseUrl+'ws/api.php', data)
                            .map(this.extractData)
                            .catch(this.handleError);
  }


  facebookProfileInfo(){
      return window.localStorage.getItem('facebook_profile');
  }

  private extractData(res: Response){
    let body = res.json();
    // if(body.succes === 'exitoso'){
    //   //console.log(body.msg);
    //   window.localStorage.setItem('userAuth', body.userAuth);
    //   window.localStorage.setItem('access_token', body.access_token);
    // };
    console.log(body);
    return body || {};

  }

  private handleError (error: Response | any) {
    console.log('handleError (Auth)');
    let errMsg: string;
    let errMsgComplete: any;
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log('DATA:'+JSON.stringify(body));
      const err = body.error || JSON.stringify(body);
      //stringify = JSON.parse(err);
      errMsgComplete = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg = `${error.status}`;
      if( errMsg === '0' ){ errMsg = 'Conexion Rechazada!'}
      if( errMsg === '401'){ errMsg = 'Acceso No Autorizado!'}
      console.log(errMsgComplete);
      console.log(err);
      //if( errMsg === '404'){ errMsg = 'No Encontrado!'}
     }
     else {
      errMsg = error.message ? error.message : error.toString();
     }
    //console.error(stringify);
    return Observable.throw( errMsg || 'Servidor no disponible, apagado o fuera de servicio');

  }


  //
  // postData(credentials, type) {
  //     return new Promise((resolve, reject) => {
  //       let headers = new Headers();
  //
  //       this.http.post(apiBaseUrl + type, JSON.stringify(credentials), {headers: headers})
  //         .subscribe(res => {
  //           resolve(res.json());
  //         }, (err) => {
  //           reject(err);
  //         });
  //     });
  //
  //   }

}
