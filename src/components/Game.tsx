import * as React from 'react';
import styled from 'styled-components';
import { BoardState, useGameState } from './GameState';

type LayoutProps = {
  gap: number;
};

const Row = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap}px;
`;

const Column = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-left: calc(-0.7cm - 2px);
  background: linear-gradient(45deg, red, blue, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


type SquareProps = {
  value: 'X' | 'O' | null;
  onClick: () => void;
};

const StyledSquare = styled.button`
  width: 34px;
  height: 34px;
  background: #fff;
  border: 1px solid #999;
  padding: 0;
  font-size: 24px;
  font-weight: bold;
`;

function Square(props: SquareProps): JSX.Element {
  return <StyledSquare onClick={props.onClick}>{props.value}</StyledSquare>;
}

type BoardProps = {
  board: BoardState;
  onClick: (square: number) => void;
};

function Board({ board, onClick }: BoardProps): JSX.Element {
  const createProps = (square: number): SquareProps => {
    return {
      value: board[square],
      onClick: () => onClick(square),
    };
  };
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Square {...createProps(0)} />
        <Square {...createProps(1)} />
        <Square {...createProps(2)} />
      </Row>
      <Row gap={0}>
        <Square {...createProps(3)} />
        <Square {...createProps(4)} />
        <Square {...createProps(5)} />
      </Row>
      <Row gap={0}>
        <Square {...createProps(6)} />
        <Square {...createProps(7)} />
        <Square {...createProps(8)} />
      </Row>
    </Column>
  );
}

const StyledPlayAgainButton = styled.button`
  margin-left: 0.2cm;
  font-family: 'Dancing Script', cursive;
  background-color: purple;
  color: white;
  cursor: pointer; /* added to indicate that button is clickable */
  &:hover {
    background-color: #944dff; /* added to change background color when hovering over the button */
  }
`;


type LogProps = {
  history: BoardState[];
  jumpTo: (index: number) => void;
};

function Log(props: LogProps): JSX.Element {
  return (
    <div>
      <StyledPlayAgainButton onClick={() => props.jumpTo(0)}>Play again!!!</StyledPlayAgainButton>
    </div>
  );
}

function Game(): JSX.Element {
  const {
    gameState,
    current,
    xIsNext,
    jumpTo,
    winner,
    handleClick,
  } = useGameState();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Column gap={29}>
        <Header>Tic Tac Toe</Header>
        <div>
          <div style={{ color: 'purple' }}>
            {winner ? <span style={{ color: 'red' }}>Winner {winner}🥳🥳</span> : `Next Player ${xIsNext ? 'X' : 'O'}`}
          </div>
          <Board board={current} onClick={handleClick} />
        </div>
        <Log history={gameState.history} jumpTo={jumpTo} />
      </Column>
    </div>
  );
}

export default Game;








