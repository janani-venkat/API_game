import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable(
  // {
  //       providedIn: 'root'
  //   }
  )

export class AppService {

  constructor(private httpClient: HttpClient) {
  }
//   startpost() {
//     return this.httpClient.post('http://127.0.0.1:8000/register');
//   }
  getHeader(){
    let headers = new HttpHeaders();
    headers = headers.set('userId', 'Ltq3TWk-');
    return headers;
  }

  postHeader(){
    let headers = new HttpHeaders(
     {
    'Content-Type' : 'application/json; charset=utf-8',
    'userId':'Ltq3TWk-'
     }
    );
    return headers;
  }

  start() {
    return this.httpClient.get(' https://http-hunt.thoughtworks-labs.net/challenge', {headers: this.getHeader()});
  }

  input(){
    return this.httpClient.get(' https://http-hunt.thoughtworks-labs.net/challenge/input', {headers: this.getHeader()});
  }

  output(data){
    console.log("dfdfd",data);
    return this.httpClient.post(' https://http-hunt.thoughtworks-labs.net/challenge/output',data, {headers: this.postHeader()});
  }
 

}
