import { Injectable } from '@angular/core';
import Minimax from 'ttt-minimax-typescript';
import Board from 'tictactoe-board';

@Injectable({
    providedIn: 'root'
})
export class GameOperationsService {

    private winningBoards: number[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    //return winning symbol
    public searchWin(board: string[]): string {
        for (let i = 0; i < this.winningBoards.length; i++) {
            const searchFirstBox = board[this.winningBoards[i][0]];
            const searchSecondBox = board[this.winningBoards[i][1]];
            const searchThirdBox = board[this.winningBoards[i][2]];

            if (searchFirstBox === 'X' && searchSecondBox === 'X' && searchThirdBox === 'X')
                return 'X';

            if (searchFirstBox === 'O' && searchSecondBox === 'O' && searchThirdBox === 'O')
                return 'O';
        }
        return null;
    }

    //return index on the board array to block your opponent
    private stopOpponentFromWinning(board: string[]): number {
        for (let i = 0; i < this.winningBoards.length; i++) {
            let countX = 0;
            let emptySpace: number;
            for (let j = 0; j < this.winningBoards[i].length; j++) {
                const index = this.winningBoards[i][j];
                if (board[index] === "X") {
                    countX++;
                }
                else {
                    emptySpace = index;
                }
            }

            if (countX === 2 && !board[emptySpace]) {
                return emptySpace;
            }
        }
        return null;
    }

    //return index on the board array to win your opponent
    private searchWinningOption(board: string[]): number {
        for (let i = 0; i < this.winningBoards.length; i++) {
            let countO = 0;
            let emptySpace: number;
            for (let j = 0; j < this.winningBoards[i].length; j++) {
                const index = this.winningBoards[i][j];
                if (board[index] === "O") {
                    countO++;
                }
                else {
                    emptySpace = index;
                }
            }

            if (countO === 2 && !board[emptySpace]) {
                return emptySpace;
            }
        }
        return null;
    }

    //return index on the board array for random empty position
    public getRandomMove(board: string[]): number {
        const arr: number[] = [];
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                arr.push(i);
            }
        }

        return arr[Math.floor(Math.random() * arr.length)];
    }

    public isBoardFull(board: string[]): boolean {
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                return false;
            }
        }
        return true;
    }

    public isBoardEmpty(board: string[]): boolean {
        for (let i = 0; i < board.length; i++) {
            if (board[i]) {
                return false;
            }
        }
        return true;
    }

    //for easy level get always random move
    public getNextMoveEasyLevel(board: string[]): number {
        return this.getRandomMove(board);
    }

    //for medium level search winning option then search to stop your opponent from winning and then do random move 
    public getNextMoveMediumLevel(board: string[]): number {
        let index = this.searchWinningOption(board);
        if (index) {
            return index;
        }

        index = this.stopOpponentFromWinning(board);
        if (index || index === 0) {
            return index;
        }

        return this.getRandomMove(board);
    }

    //for hard level get best move from minimax algorithm.
    public getNextMoveHardLevel(board: string[]): number {
        const tempBoard = new Board(board);
        const minimax = new Minimax('O', 'X');
        const index = minimax.findBestMove(tempBoard);
        return index - 1;
    }
}
