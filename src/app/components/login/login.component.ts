import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  EsInsertar: boolean = true;
  login!: FormGroup;
  register!: FormGroup;
  loginError: boolean = false;
  id!: number;
  date_register!: Date;
  showEffect: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UsersService,
    private router: Router, private activatedRouter: ActivatedRoute, private sanckBar: MatSnackBar){}
  
  ngOnInit(){
    this.reactiveForm();
    this.moveLabel();
    this.changeSlide();
    this.textSlider();
    setTimeout(() => {
      this.showEffect = true;
    }, 500);
  }  

  reactiveForm():void{
    this.login = this.formBuilder.group({
      email_user:["", [Validators.required]],
      password_user:["", [Validators.required, Validators.min(8)]]
    });

    this.register = this.formBuilder.group({
      id:[""],
      name_user:["",[Validators.required]],
      email_user:["",[Validators.required, Validators.email]],
      password_user:["",[Validators.required, Validators.min(8)]]
    });
  }
  

  loginUser(){
    this.userService.getUsers().subscribe( element => {
      const user = element.find((a:User) => {
        return a.email == this.login.get('email_user')!.value && a.password == this.login.get('password_user')!.value
      });
      if(user){
        console.log("loging");
        this.loginError = false;
        this.router.navigate(["dashboard-panel"]);
      }
      else{
        console.log("Error");
        this.loginError = true;
      }
    })
  }

  signupUser():void{
    this.date_register = new Date();
    const user: User = {
      id: this.id,
      name: this.register.get('name_user')!.value,
      last_name: "not yet",
      user_name: "not yet",
      password: this.register.get('password_user')!.value,
      email: this.register.get('email_user')!.value,
      phone: "not yet",
      position: "Profesor",
      type: "not yet",
      level: "Primaria",
      photo: "not yet",
      description: "not yet",
      date_register: this.date_register
    }
    if(this.EsInsertar){
      this.userService.addUser(user).subscribe({
        next: (data) => {
          console.log("registro");
          this.sanckBar.open("Se ha registrado correctamente", "OK", {duration:5000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  moveLabel(){
    const inputs = document.querySelectorAll(".input-field");

    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        const inpu = inp as HTMLInputElement;
        if(inpu.value != "") return;
        inp.classList.remove("active");
      });
    });
  }

  changeSlide(){
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelectorAll("main");

    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        main.forEach((mai) => {
          mai.classList.toggle("sign-up-mode");
        });
      });
    });
  }

  hola():void{
    console.log("hola");
  }

  textSlider(){
    const bullets = document.querySelectorAll(".bullets span");
    const images = document.querySelectorAll(".image");

    function moveSlider(this: HTMLElement){
      let index = this.dataset['value'];
      const ind = index as unknown as number;

      let currentImage = document.querySelector(`.img-${index}`);
      images.forEach((img) => img.classList.remove("show"));
      currentImage?.classList.add("show");

      const slider = document.querySelector(".text-group");
      const textLableSlider = slider as HTMLElement;
      textLableSlider.style.transform = `translateY(${-(ind - 1) * 3}rem)`;

      bullets.forEach(bull => bull.classList.remove("active"));
      this.classList.add("active");
    }

    bullets.forEach(bullet => {
      bullet.addEventListener("click", moveSlider);
    });
  }

}
