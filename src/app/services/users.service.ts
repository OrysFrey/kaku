import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  path_server: string = "http://localhost:3000";
  source: string = "users";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.path_server + "/" + this.source);
  }

  getUser(id: number){
    return this.http.get<User>(this.path_server + "/" + this.source + "/" + id.toString());
  }

  addUser(user: User){
    return this.http.post<User>(this.path_server + "/" + this.source, user);
  }

  updateUser(user: User){
    return this.http.put<User>(this.path_server + "/" + this.source + "/" + user.id.toString(), user);
  }

  deleteUser(id: number){
    return this.http.delete<User>(this.path_server + "/" + this.source + "/" + id.toString());
  }

  validateUser(user_name: string, password: string){
    return this.http.get<User>(this.path_server + "/" + this.source + "/user_name/" + user_name + "/password/" + password);
  }
}
