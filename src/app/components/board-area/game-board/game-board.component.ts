import { Component } from '@angular/core';
import { GameOperationsService } from '../../../services/game-operations.service';
import { CommonModule } from '@angular/common';
import { Difficulty } from '../../../models/difficulty.enum';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-game-board',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './game-board.component.html',
    styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
    public board: string[] = ["", "", "", "", "", "", "", "", ""];
    public userResult: number = 0;
    public computerResult: number = 0;
    public selectedDifficulty: number = Difficulty.Easy;
    public isBoardEmpty: boolean = true;

    public constructor(private gameOperationsService: GameOperationsService) { }

    public handleItemClick(b: string, i: number): void {

        if (this.board[i]) {
            return;
        }

        this.board[i] = "X";

        if (this.checkGameOver())
            return;

        let indexO: number;

        if (+this.selectedDifficulty === Difficulty.Easy)
            indexO = this.gameOperationsService.getNextMoveEasyLevel(this.board);

        if (+this.selectedDifficulty === Difficulty.Medium)
            indexO = this.gameOperationsService.getNextMoveMediumLevel(this.board);

        if (+this.selectedDifficulty === Difficulty.Hard)
            indexO = this.gameOperationsService.getNextMoveHardLevel(this.board);

        this.board[indexO] = "O";

        if (this.checkGameOver())
            return;

        this.isBoardEmpty = this.gameOperationsService.isBoardEmpty(this.board);
    }

    private checkGameOver(): boolean {
        let winningSymbol = this.gameOperationsService.searchWin(this.board);
        if (winningSymbol) {
            if (winningSymbol === "X") {
                setTimeout(() => {
                    alert("You Won!!");
                    this.board = ["", "", "", "", "", "", "", "", ""];
                    this.isBoardEmpty = true;
                    this.userResult++;
                }, 10);
            }
            else {
                setTimeout(() => {
                    alert("You Lost!!");
                    this.board = ["", "", "", "", "", "", "", "", ""];
                    this.isBoardEmpty = true;
                    this.computerResult++;
                }, 10);
            }

            return true;
        }
        else {
            if (this.gameOperationsService.isBoardFull(this.board)) {
                setTimeout(() => {
                    alert("Draw!!");
                    this.board = ["", "", "", "", "", "", "", "", ""];
                    this.isBoardEmpty = true;
                }, 10);
                return true;
            }
        }
        return false;
    }
}
