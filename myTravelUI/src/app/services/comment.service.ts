import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string =  environment.baseUrl + "/Comment/"
  constructor(private http: HttpClient) { }

  create(commentObj:any){
    return this.http.post<any>(`${this.baseUrl}create`,commentObj);
  }

  delete(commentId:string){
    return this.http.delete<any>(`${this.baseUrl}delete/` + commentId);
  }

  list(){
    return this.http.get<string[]>(`${this.baseUrl}list`);
  }
}


