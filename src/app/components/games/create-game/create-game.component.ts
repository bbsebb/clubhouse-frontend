import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {Observable, switchMap} from "rxjs";
import {Gender} from "../../../models/games/Gender";
import {Category} from "../../../models/games/Category";
import {CategoryService} from "../../../services/games/category.service";
import {Hall} from "../../../models/games/Hall";
import {HallService} from "../../../services/games/hall.service";
import {Club} from "../../../models/games/Club";
import {ClubService} from "../../../services/games/club.service";
import {GameCreateDTO} from "../../../services/games/dto/game-create-dto";
import {GameService} from "../../../services/games/game.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule,MatSnackBarModule],
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  gender = Gender;

  formGame!: FormGroup;
  genderControl!: FormControl;
  categoryControl!: FormControl;
  halleControl!: FormControl;
  dateTimeControl!: FormControl;
  homeTeamControl!: FormControl;
  visitingTeamControl!: FormControl;

  club$!: Observable<Club[]>;
  categories$!: Observable<Category[]>
  halle$!: Observable<Hall[]>;


  constructor(private formBuilder: FormBuilder,
              private gameService:GameService,
              private clubService: ClubService,
              private categoryService: CategoryService,
              private halleService: HallService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.genderControl = this.formBuilder.control('',[Validators.required]);
    this.categoryControl = this.formBuilder.control('',[Validators.required]);
    this.homeTeamControl = this.formBuilder.control('',[Validators.required]);
    this.visitingTeamControl = this.formBuilder.control('',[Validators.required]);
    this.halleControl = this.formBuilder.control('',[Validators.required]);
    this.dateTimeControl = this.formBuilder.control('',[Validators.required]);

    this.categories$ = this.categoryService.getCategories();
    this.club$ = this.clubService.getClubs();
    this.halle$ = this.homeTeamControl.valueChanges.pipe(
      switchMap(clubCode => this.clubService.getClub(clubCode)),
      switchMap(club => this.halleService.getHall(club.code))
    )

    this.formGame = this.formBuilder.group({
      gender : this.genderControl,
      categoryId : this.categoryControl,
      homeTeamClubCode : this.homeTeamControl,
      visitingTeamClubCode : this.visitingTeamControl,
      halleId : this.halleControl,
      dateTime : this.dateTimeControl
    })
  }

  onSubmit():void {
    const gameCreate:GameCreateDTO = this.formGame.value;
    if(this.formGame.valid) {
      this.gameService.createGame(gameCreate).subscribe({
          next: response => {
            this.router.navigate(['/games', response.code])
              .then(r => this.snackBar.open('Rencontre ajoutée','Fermer'));

          },
          error: error => this.snackBar.open('Il y a eu une erreur','Fermer')
        }
      );
    }

  }
}
