import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  activeSlide = 0;
  slides = [
    { label: "Rencontres", routerLink: "/games", description: "Découvrez les rencontres à venir", backgroundImage: 'path/to/your/image1.jpg' },
    { label: "Utilisateurs", routerLink: "/users", description: "Explorez notre base d'utilisateurs", backgroundImage: 'path/to/your/image2.jpg' },
    { label: "Club-house", routerLink: "/bookings", description: "Réservez votre place au club-house", backgroundImage: 'path/to/your/image3.jpg' }
  ];

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }
}
