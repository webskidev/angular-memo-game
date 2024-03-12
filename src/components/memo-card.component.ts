import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MemoCard } from './game-board.component';

@Component({
  selector: 'app-memo-card',
  standalone: true,
  styles: [
    `.memo {
    margin: 0;
    padding: 0;
    width: 200px;
    height: 200px;
    cursor: pointer; 
    }

    .memo-image {
      width: 100%;
      object-fit: cover;
    }`,
  ],
  template: `
    @if(memo.flipped) {
      <button class="memo bg-blue-400 rounded-md">
        <img class="memo-image" [src]="memo.imageUrl" />
      </button>
    } @else {
      <button class="memo bg-blue-400 rounded-md" (click)="flipMemoCard()"></button>
    }
  `,
})
export class MemoCardComponent {
  @Input({ required: true }) memo!: MemoCard;
  @Output() cardFlipped: EventEmitter<void> = new EventEmitter();

  flipMemoCard(): void {
    this.cardFlipped.emit();
  }
}
