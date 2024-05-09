import { Routes } from '@angular/router';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { GameBoardComponent } from './components/board-area/game-board/game-board.component';

export const routes: Routes = [
    { path: "board", component: GameBoardComponent },
    { path: "", redirectTo: "/board", pathMatch: "full" },
    { path: "**", component: Page404Component },
];
