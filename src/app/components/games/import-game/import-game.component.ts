import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {GameService} from "../../../services/games/game.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-import-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, NgxMatFileInputModule, MatSnackBarModule],
  templateUrl: './import-game.component.html',
  styleUrls: ['./import-game.component.scss']
})
export class ImportGameComponent implements OnInit{
  formImportFile !: FormGroup;
  fileControle !: FormControl;

 constructor(private formBuilder:FormBuilder,private gameService:GameService,private snackBar:MatSnackBar) {
 }

  ngOnInit(): void {
    this.fileControle = this.formBuilder.control('',[Validators.required])
    this.formImportFile = this.formBuilder.group( {
      file: this.fileControle
    })
  }

  onSubmit() {

    this.gameService.importGame(this.formImportFile.get('file')?.value).subscribe(
      {
        next: (response) => this.snackBar.open('Le fichier a bien été importé','Fermer'),
        error: err => this.snackBar.open('Une erreur est survenu dans l\'import du fichier','Fermer')
      }
    )
  }
}
