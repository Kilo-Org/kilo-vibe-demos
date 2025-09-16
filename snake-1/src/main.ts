interface Position {
  x: number;
  y: number;
}

enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

class Snake {
  private segments: Position[];
  private direction: Direction;
  private nextDirection: Direction;

  constructor(startPosition: Position) {
    this.segments = [startPosition];
    this.direction = Direction.Right;
    this.nextDirection = Direction.Right;
  }

  getHead(): Position {
    return this.segments[0];
  }

  getSegments(): Position[] {
    return [...this.segments];
  }

  setDirection(newDirection: Direction): void {
    if (this.isOppositeDirection(newDirection)) return;
    this.nextDirection = newDirection;
  }

  private isOppositeDirection(dir: Direction): boolean {
    const opposites = {
      [Direction.Up]: Direction.Down,
      [Direction.Down]: Direction.Up,
      [Direction.Left]: Direction.Right,
      [Direction.Right]: Direction.Left,
    };
    return opposites[this.direction] === dir;
  }

  move(): void {
    this.direction = this.nextDirection;
    const head = this.getHead();
    const newHead = this.calculateNewHead(head, this.direction);
    this.segments.unshift(newHead);
  }

  private calculateNewHead(head: Position, direction: Direction): Position {
    const segmentSize = 20;
    switch (direction) {
      case Direction.Up:
        return { x: head.x, y: head.y - segmentSize };
      case Direction.Down:
        return { x: head.x, y: head.y + segmentSize };
      case Direction.Left:
        return { x: head.x - segmentSize, y: head.y };
      case Direction.Right:
        return { x: head.x + segmentSize, y: head.y };
    }
  }

  grow(): void {
    // Do nothing here, move() already added the new head
  }

  removeTail(): void {
    this.segments.pop();
  }

  checkSelfCollision(): boolean {
    const head = this.getHead();
    return this.segments
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }

  checkWallCollision(canvasWidth: number, canvasHeight: number): boolean {
    const head = this.getHead();
    return (
      head.x < 0 ||
      head.x >= canvasWidth ||
      head.y < 0 ||
      head.y >= canvasHeight
    );
  }
}

class Apple {
  private position: Position;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.position = this.generateRandomPosition(canvasWidth, canvasHeight);
  }

  getPosition(): Position {
    return this.position;
  }

  regenerate(
    snakeSegments: Position[],
    canvasWidth: number,
    canvasHeight: number
  ): void {
    do {
      this.position = this.generateRandomPosition(canvasWidth, canvasHeight);
    } while (this.isOnSnake(snakeSegments));
  }

  private generateRandomPosition(
    canvasWidth: number,
    canvasHeight: number
  ): Position {
    const segmentSize = 20;
    const maxX = Math.floor(canvasWidth / segmentSize) - 1;
    const maxY = Math.floor(canvasHeight / segmentSize) - 1;
    return {
      x: Math.floor(Math.random() * (maxX + 1)) * segmentSize,
      y: Math.floor(Math.random() * (maxY + 1)) * segmentSize,
    };
  }

  private isOnSnake(snakeSegments: Position[]): boolean {
    return snakeSegments.some(
      (segment) =>
        segment.x === this.position.x && segment.y === this.position.y
    );
  }
}

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snake: Snake;
  private apple: Apple;
  private gameRunning: boolean;
  private gameStarted: boolean;
  private lastUpdateTime: number;
  private updateInterval: number;
  private score: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.snake = new Snake({ x: 200, y: 200 });
    this.apple = new Apple(canvas.width, canvas.height);
    this.gameRunning = false;
    this.gameStarted = false;
    this.lastUpdateTime = 0;
    this.updateInterval = 150; // milliseconds
    this.score = 0;
    this.setupInputHandlers();
    this.setupStartHandlers();
    this.setupGameOverHandlers();
  }

  start(): void {
    this.gameLoop(0);
  }

  private startGame(): void {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.gameRunning = true;
      this.hideStartMessage();
      this.hideGameOverOverlay();
      this.canvas.focus();
    }
  }

  private hideStartMessage(): void {
    const startMessage = document.getElementById("start-message");
    if (startMessage) {
      startMessage.classList.add("hidden");
    }
  }
  private resetGame(): void {
    this.snake = new Snake({ x: 200, y: 200 });
    this.apple = new Apple(this.canvas.width, this.canvas.height);
    this.score = 0;
    this.gameRunning = false;
    this.gameStarted = false;
    this.hideGameOverOverlay();
  }

  private hideGameOverOverlay(): void {
    const gameOverOverlay = document.getElementById("game-over-overlay");
    if (gameOverOverlay) {
      gameOverOverlay.classList.add("hidden");
    }
  }

  private showGameOverOverlay(): void {
    const gameOverOverlay = document.getElementById("game-over-overlay");
    const finalScore = document.getElementById("final-score");
    if (gameOverOverlay && finalScore) {
      finalScore.textContent = `Score: ${this.score}`;
      gameOverOverlay.classList.remove("hidden");
    }
  }

  private gameLoop(currentTime: number): void {
    if (
      currentTime - this.lastUpdateTime >= this.updateInterval &&
      this.gameRunning
    ) {
      this.update();
      this.lastUpdateTime = currentTime;
    }

    this.render();
    requestAnimationFrame((time) => this.gameLoop(time));
  }

  private update(): void {
    if (!this.gameStarted) return;

    this.snake.move();

    if (this.checkAppleCollision()) {
      this.score += 10;
      this.apple.regenerate(
        this.snake.getSegments(),
        this.canvas.width,
        this.canvas.height
      );
      // Snake grows by not removing tail
    } else {
      this.snake.removeTail();
    }

    if (
      this.snake.checkSelfCollision() ||
      this.snake.checkWallCollision(this.canvas.width, this.canvas.height)
    ) {
      this.gameRunning = false;
      this.showGameOverOverlay();
    }
  }

  private checkAppleCollision(): boolean {
    const head = this.snake.getHead();
    const applePos = this.apple.getPosition();
    return head.x === applePos.x && head.y === applePos.y;
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw snake
    this.ctx.fillStyle = "green";
    this.snake.getSegments().forEach((segment) => {
      this.ctx.fillRect(segment.x, segment.y, 20, 20);
    });

    // Draw apple
    this.ctx.fillStyle = "red";
    const applePos = this.apple.getPosition();
    this.ctx.fillRect(applePos.x, applePos.y, 20, 20);
  }

  private setupInputHandlers(): void {
    document.addEventListener("keydown", (event) => {
      if (!this.gameStarted) {
        this.startGame();
      }

      switch (event.key) {
        case "ArrowUp":
          this.snake.setDirection(Direction.Up);
          break;
        case "ArrowDown":
          this.snake.setDirection(Direction.Down);
          break;
        case "ArrowLeft":
          this.snake.setDirection(Direction.Left);
          break;
        case "ArrowRight":
          this.snake.setDirection(Direction.Right);
          break;
      }
    });
  }

  private setupStartHandlers(): void {
    this.canvas.addEventListener("click", () => {
      if (!this.gameStarted) {
        this.startGame();
      }
    });

    this.canvas.addEventListener("focus", () => {
      if (!this.gameStarted) {
        this.startGame();
      }
    });
  }

  private setupGameOverHandlers(): void {
    const gameOverOverlay = document.getElementById("game-over-overlay");
    if (gameOverOverlay) {
      gameOverOverlay.addEventListener("click", () => {
        this.resetGame();
        this.startGame();
      });
    }
  }
}

// Entry point
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
  const game = new Game(canvas, ctx);
  game.start();
} else {
  console.error("Failed to get 2D context from canvas");
}
