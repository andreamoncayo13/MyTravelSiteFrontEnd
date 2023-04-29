import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string =  environment.baseUrl + "/User/"
  constructor(private http: HttpClient) { }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

  getCurrentUser(){
    return sessionStorage.getItem('userName');
  }

  logOut(){
    sessionStorage.clear();
  }

  isLoggedIn():boolean{
    let currentUser = this.getCurrentUser();
    return !(currentUser === undefined || currentUser === null);
  }
}
