import { Injectable } from '@angular/core';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }


   formModel:FormGroup =  this.fb.group({
  UserName:['',Validators.required],
  Email:['',Validators.email],
  FullName:[''],
  Passwords: this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['',Validators.required]
  },{validator: this.comparePasswords})
  

});
 
comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
       if(fb.get('Password').value!= confirmPswrdCtrl.value){
         confirmPswrdCtrl.setErrors({passwordMismatch:true});
       } else {
         confirmPswrdCtrl.setErrors(null);
       }
    }
}
readonly baseURL = "http://localhost:50994/api";

register(){
var body = {
  UserName: this.formModel.value.UserName,
  Email: this.formModel.value.Email,
  FullName: this.formModel.value.FullName,
  Password: this.formModel.value.Passwords.Password

}

return this.http.post(this.baseURL+'/ApplicationUser/Register',body);
 
}


login(FormData:any){
  return this.http.post(this.baseURL+'/ApplicationUser/Login',FormData);
} 

getUserProfile(){
 
  
 return  this.http.get(this.baseURL+'/UserProfile');

}

}
