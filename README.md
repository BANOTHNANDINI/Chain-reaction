
# Chain Reaction Game

Welcome to Chain Reaction, a 2 player web-based game where players strategically place colored balls on a grid, aiming to control all balls on the board to win.


## Overview
Chain Reaction is a game where players take turns placing their colored balls on a 6x6 grid. Each cell on the grid has a limit to how many balls it can hold before exploding and distributing balls to adjacent cells. The game ends when one player controls all the balls on the board.

## Features
- Two-player turn-based gameplay.
- Randomly assigned player colors.
- Chain reaction explosions handled using BFS algorithm.
- Clear player indicators and game status display.

Certainly! Here's the specific section highlighting the BFS algorithm for the Chain Reaction game:

---

## BFS Algorithm
The explosion mechanism in Chain Reaction is powered by the Breadth-First Search (BFS) algorithm:

- **Initialization**: Start BFS from a cell that has exceeded its ball limit.
- **Queue-based Approach**: Use a queue to manage cells that need processing.
- **Process Explosion**: For each cell processed, distribute its balls to adjacent cells and potentially trigger further explosions.
- **Efficiency**: BFS ensures that explosions are handled level by level, simulating the chain reaction in a structured manner.
---
## Setup Instructions
To run the game locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chain-reaction-game.git
   ```
2. Navigate into the project directory:
   ```bash
   cd chain-reaction-game
   ```
3. Open `index.html` in your web browser to start playing.

## Game Rules
The game follows these basic rules:
- Players take turns placing their colored balls on any empty cell on the grid.
- Each cell has a limit to how many balls it can hold.
- cell limit rules:
  - 1 ball in corners.
  - 2 balls on edges (excluding corners).
  - 3 balls in center cells.
- When a cell exceeds its limit, it explodes:
  - Distributing its balls to adjacent cells.
  - Converting balls of the opposing player in adjacent cells.
- The game ends when one player controls all the balls on the board.

## Technologies Used
- HTML5
- CSS3
- JavaScript
