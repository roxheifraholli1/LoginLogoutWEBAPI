import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
   this.service.formModel.reset();

   if(localStorage.getItem('token')!=null){
    this.router.navigateByUrl('/home');
     }
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New User Created!','Registration Successful!');
        } else {
          res.errors.forEach((element:any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration Failed!');
                break;

              default:
                this.toastr.error(element.description,'Registration Failed!');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
