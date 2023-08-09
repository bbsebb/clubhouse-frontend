import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {combineLatest, Observable, switchMap} from "rxjs";
import {Team} from "../../../models/games/Team";
import {TeamService} from "../../../services/team.service";
import {Gender} from "../../../models/games/Gender";
import {Category} from "../../../models/games/Category";
import {CategoryService} from "../../../services/category.service";
import {Halle} from "../../../models/games/Halle";
import {HalleService} from "../../../services/halle.service";
import {map} from "rxjs/operators";
import {Club} from "../../../models/games/Club";
import {ClubService} from "../../../services/club.service";

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
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
  halle$!: Observable<Halle[]>;


  constructor(private formBuilder: FormBuilder,
              private clubService: ClubService,
              private categoryService: CategoryService,
              private halleService: HalleService) {
  }

  ngOnInit(): void {


    this.categories$ = this.categoryService.getCategories();

    this.genderControl = this.formBuilder.control('');
    this.categoryControl = this.formBuilder.control('');
    this.homeTeamControl = this.formBuilder.control('');
    this.visitingTeamControl = this.formBuilder.control('');
    this.halleControl = this.formBuilder.control('');
    this.dateTimeControl = this.formBuilder.control('');






    this.club$ = this.clubService.getClubs();

    this.halle$ = this.homeTeamControl.valueChanges.pipe(
      switchMap(clubCode => this.clubService.getClub(clubCode)),
      switchMap(club => this.halleService.getHalles(club.code))
    )

    this.formGame = this.formBuilder.group({})
  }
}
