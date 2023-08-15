import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../services/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  formSignIn!: FormGroup;
  loading: boolean = false;
  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router:Router,private snackBar:MatSnackBar) {
  }
  ngOnInit(): void {
    this.formSignIn = this.formBuilder.group({
      "username":['',Validators.required],
      "password":['',Validators.required]
    })
  }

  onSubmit() {
    if(this.formSignIn.valid) {
      this.loading = true;
        this.authService.login(this.formSignIn.value.username,this.formSignIn.value.password)
          .subscribe({
            next: user => {
              this.router.navigate(["/"]).then(() =>  this.snackBar.open('Connexion réussie','Fermer'))
            },
            error: err => {
              this.loading = false;
              this.snackBar.open('Mot de passe ou login incorrect','Fermer');
            }
          })
    }
  }
}
