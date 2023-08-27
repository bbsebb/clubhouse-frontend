import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Game} from "../../../models/games/Game";
import {GameService} from "../../../services/games/game.service";
import {UserService} from "../../../services/users/user.service";
import {User} from "../../../models/users/user";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NameTeamPipe} from "../../../utils/pipes/name-team.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatTableModule, NameTeamPipe, RouterLink],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit,AfterViewInit{

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource : MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: String[] = [
    "username",
    "email",
    "roles",
  ];

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
  }


}
