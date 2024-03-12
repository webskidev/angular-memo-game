import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { GameBoardComponent } from './components/game-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameBoardComponent],
  template: `
    <app-game-board></app-game-board>
  `,
})
export class App {
  gridSize = 4;
}

bootstrapApplication(App);
