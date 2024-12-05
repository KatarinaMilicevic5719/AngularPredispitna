import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isSent:boolean=false;
  form:any=new FormGroup({
    fullName:new FormControl('',[Validators.required,Validators.pattern(/^[A-ZČĆŽŠĐa-zčćžšđ]+(?:\s[A-ZČĆŽŠĐa-zčćžšđ]+)+$/),Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    subject:new FormControl('',[Validators.required,Validators.minLength(3)]),
    message:new FormControl('',[Validators.required,Validators.minLength(5)])
  })
  onSubmit():void{
    this.form.reset({
      fullName:"",
      lastName:"",
      email:"",
      phone:"",
      message:""
    })
    this.isSent=true;
  }
}
