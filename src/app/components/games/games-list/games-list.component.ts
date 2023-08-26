import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameService} from "../../../services/games/game.service";
import {Game} from "../../../models/games/Game";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NameTeamPipe} from "../../../utils/pipes/name-team.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, NameTeamPipe, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit,AfterViewInit{

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource : MatTableDataSource<Game> = new MatTableDataSource<Game>();
  displayedColumns: String[] = [
    "day",
    "date",
    "time",
    "homeTeam",
    "scoreHomeTeam",
    "scoreVisitingTeam",
    "visitingTeam",
    "view",
    "edit"
  ];

  constructor(private gameService:GameService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.dataSource.data = games;
      this.dataSource.paginator = this.paginator;
    });
  }


}
