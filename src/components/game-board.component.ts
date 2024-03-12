import { Component, WritableSignal, signal } from '@angular/core';
import { MemoCardComponent } from './memo-card.component';

export interface MemoCard {
  id: number;
  imageUrl: string;
  flipped: boolean;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [MemoCardComponent],
  styles: [
    ` .board { display: grid; grid-template-columns: 200px 200px; gap: 1rem } `,
  ],
  template: `
    <main class="flex flex-col gap-2 p-4">
      <div class="flex gap-2 items-center">
        <button class="rounded-md bg-blue-200 px-4 py-1" (click)="reset()">Reset</button>
        <span>Match count: {{ matchCount() }}</span>
      </div>
      <div class="board">
        @for(memo of memos(); track memo.id; let idx = $index) {
            <app-memo-card [memo]="memo" (cardFlipped)="calculateMatch(idx)"></app-memo-card>
          }
      </div>
    </main>
  `,
})
export class GameBoardComponent {
  memos: WritableSignal<MemoCard[]> = signal([]);
  flippedCardsCount: WritableSignal<number> = signal(0);
  matchCount: WritableSignal<number> = signal(0);

  initialMemos = [
    {
      id: 0,
      imageUrl:
        'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
      flipped: false,
    },
    {
      id: 1,
      imageUrl:
        'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
      flipped: false,
    },
    {
      id: 1,
      imageUrl:
        'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
      flipped: false,
    },
    {
      id: 0,
      imageUrl:
        'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
      flipped: false,
    },
  ];

  ngOnInit() {
    this.memos.set(structuredClone(this.initialMemos));
  }

  reset(): void {
    this.memos.set(structuredClone(this.initialMemos));
    this.matchCount.set(0);
  }

  calculateMatch(cardIndex: number): void {
    this.memos()[cardIndex].flipped = true;
    this.flippedCardsCount.set(this.flippedCardsCount() + 1);

    if (this.flippedCardsCount() === 2) {
      const flippedCards = this.memos().filter((memoCard) => memoCard.flipped);
      const areMatched = flippedCards[0].id === flippedCards[1].id;

      if (areMatched) {
        this.matchCount.set(this.matchCount() + 1);
        setTimeout(() => {
          this.removeMatchedCards(flippedCards);
          this.flippedCardsCount.set(0);
        }, 1500);
      } else {
        setTimeout(() => this.memos().forEach((memo) => (memo.flipped = false)), 1500);
      }
    }
  }

  private removeMatchedCards(matchedCards: MemoCard[]): void {
    matchedCards.forEach((card) => {
      const index = this.memos().findIndex((memo) => memo.id === card.id);
      this.memos().splice(index, 1);
    });
  }
}
