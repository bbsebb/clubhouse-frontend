import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../../services/games/game.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Game } from '../../../../models/games/Game';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game$!: Observable<Game>;
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.game$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((code) => {
        if (code === null) {
          throw new Error('code should exist');
        }
        return this.gameService.getGame(code);
      })
    );
  }
}
