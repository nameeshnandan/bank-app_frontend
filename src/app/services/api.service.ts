import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //register api call
  register(acno:any,username:any,password:any){
    const body={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:5000/register',body); //post method expecting more than one arguements so we giving the parameters as the arguement (body as an object)
  }

  //login
  login(acno:any,password:any){
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:5000/login',body)
  }

  //append token to the req header
  appendToken(){
    //to grt the token from the local storage
    let token= localStorage.getItem('token');
    //create http header
    let headers=new HttpHeaders();

    if(token){
      headers=headers.append('verify-token',token)
      options.headers=headers

    }
    return options
  }

  //getbalance api call
  getBalance(acno:any){
    return this.http.get('http://localhost:5000/balance/'+acno,this.appendToken())
  }

  //Fund transfer
  fundTransfer(toAcno:any,password:any,amount:any){
    const body={
      toAcno,
      password,
      amount
    }
    return this.http.post('http://localhost:5000/fundtransfer',body,this.appendToken())
  }

  //get transaction history
  getTransaction(){
    return this.http.get('http://localhost:5000/transactions',this.appendToken())
  }

  //delete user account
  deleteUserAccount(){
    return this.http.delete('http://localhost:5000/deleteAccount',this.appendToken())
  }

}


