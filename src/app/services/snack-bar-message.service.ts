import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SnackBarMessageService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  public notifyFormSubmission(routes: any[], message: string): void {
    if (routes && routes.length > 0) {
      this.router
        .navigate(routes)
        .then((r) => this.snackBar.open(message, 'Fermer'));
    } else {
      this.snackBar.open(message, 'Fermer');
    }
  }
}
