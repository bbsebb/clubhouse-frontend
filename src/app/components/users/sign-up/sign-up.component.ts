import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Validation } from '../../../utils/validators/validation';
import { UserService } from '../../../services/users/user.service';
import { UserCreateDTO } from '../../../services/users/dto/user-create-dto';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  loading: boolean = false;
  formSignUp!: FormGroup;
  formPassword!: FormGroup;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  confirmPasswordControl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.emailControl = this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordControl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.formPassword = this.formBuilder.group(
      {
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
      },
      {
        validators: Validation.match('password', 'confirmPassword'),
      }
    );
    this.formSignUp = this.formBuilder.group({
      username: ['', Validators.required],
      email: this.emailControl,
      password: this.formPassword,
    });
  }

  onSubmit(): void {
    if (this.formSignUp.valid) {
      this.loading = true;
      let userCreateDTO: UserCreateDTO = {
        username: this.formSignUp.value.username,
        email: this.formSignUp.value.email,
        password: this.formSignUp.value.password.password,
      };
      this.userService
        .createUser(userCreateDTO)
        .pipe()
        .subscribe({
          next: (response) => {
            this.router
              .navigate(['admin'])
              .then((r) =>
                this.snackBar.open('Inscription enregistrée', 'Fermer')
              );
          },
          error: (error) => {
            this.snackBar.open('Il y a eu une erreur', 'Fermer');
            this.loading = false;
          },
        });
    }
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return `L'email n'est pas valide`;
    } else if (ctrl.hasError('matching')) {
      return `Les deux mot de passe ne sont pas identiques`;
    } else {
      return 'une erreur est survenue';
    }
  }
}
