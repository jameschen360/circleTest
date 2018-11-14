import { Component, OnInit } from '@angular/core';
import { PubNubWebsocket } from '../service/websocket/websocket';
import { WebsocketEventGetter } from '../service/websocket-event-getter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  public ticTacSquareArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  public userData = JSON.parse(localStorage.getItem('userData'));
  public currentUserTurn = 0;

  public winningPlayer;
  public hasWon = false;

  constructor(
    public websocketService: PubNubWebsocket,
    public websocketEventGetterService: WebsocketEventGetter,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(id => {
      this.ngOnInit();
      console.log(id);
    });

  }

  ngOnInit() {
    this.websocketService.pubNubInit();
    this.websocketEventGetter();
  }

  websocketEventGetter() {
    const userData: any = JSON.parse(localStorage.getItem('userData'));
    this.websocketEventGetterService.eventIdGetter(userData).then((val: any) => {
      console.log(val);
      this.websocketService.pubNubSub(val.eventID);
    });
  }

  putMarker(event) {
    const row = event.srcElement.id.split('_')[0];
    const col = event.srcElement.id.split('_')[1];

    // need to subscribe to websocket to determine which user

    if (this.ticTacSquareArray[row][col] === 0) {
      this.currentUserTurn += 1;
      let symbol;
      if (this.currentUserTurn % 2 == 0) {
        // 2 represents 'O'
        symbol = 2;
      } else {
        // if odd 3 represents 'X'
        symbol = 5;
      }
      this.ticTacSquareArray[row][col] = symbol;
      this.winningPlayer = this.checkForWinner();
    }

  }

  checkForWinner() {
    // check for rows sums if all three are connected
    let rowSum;
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.ticTacSquareArray[i][j];
      }
      if (rowSum === 6) {
        alert('Player O wins');
        this.resetGame();
      } else if (rowSum === 15) {
        alert('Player X wins');
        this.resetGame();
      }
    }

    // check for column sums
    let colSum;
    for (let i = 0; i < 3; i++) {
      colSum = 0;
      for (let j = 0; j < 3; j++) {
        colSum += this.ticTacSquareArray[j][i];
      }
      if (colSum === 6) {
        alert('Player O wins');
        this.resetGame();
      } else if (colSum === 15) {
        alert('Player X wins');
        this.resetGame();
      }
    }

    // check for diagnal
    if (this.ticTacSquareArray[0][0] + this.ticTacSquareArray[1][1] + this.ticTacSquareArray[2][2] === 6) {
      alert('Player O wins');
      this.resetGame();
    } else if (this.ticTacSquareArray[0][0] + this.ticTacSquareArray[1][1] + this.ticTacSquareArray[2][2] === 15) {
      alert('Player X wins');
      this.resetGame();
    }

    if (this.ticTacSquareArray[0][0] + this.ticTacSquareArray[1][1] + this.ticTacSquareArray[2][2] === 6) {
      alert('Player O wins');
      this.resetGame();
    } else if (this.ticTacSquareArray[2][0] + this.ticTacSquareArray[1][1] + this.ticTacSquareArray[0][2] === 15) {
      alert('Player X wins');
      this.resetGame();
    }

    this.checkForTie();
  }

  // function to check for tie
  checkForTie() {
    let number = [];
    for (let i = 0; i < this.ticTacSquareArray.length; i++) {
      number[i] = this.ticTacSquareArray[i].reduce((p, c) => { return p * c; });
    }
    const numberAllCheck = number.reduce((p, c) => { return p * c; });
    if (numberAllCheck != 0) {
      // if tie, we want to reset the game
      this.resetGame();
      alert('It was a tie!');
    }
  }

  resetGame() {
    this.hasWon = false;
    this.currentUserTurn = 0;
    this.ticTacSquareArray = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  }
}
