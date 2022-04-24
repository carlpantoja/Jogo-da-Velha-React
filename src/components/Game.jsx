import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(3, 150px);
  gap: 1rem;
`;
const Button = styled.button`
  font-size: 100px;
  padding: 10px;
  background-color: #e9e9e9;
  border-radius: 5px;
  border-color: #e9e9e9;
  cursor: pointer;
  cursor: ${(props) => (props.block ? 'not-allowed' : '')}
`;

function Jogo() {
  const emptyValue = Array(9).fill('');
  const [values, setValues] = useState(emptyValue);
  const [currentPlayer, setCurrentPlayer] = useState('O');

  const handleClick = (index) => {
    if (values[index] !== '') {
      alert('Posição ocupada');
      return null;
    }
    setValues(values.map((item, itemIndex) => (itemIndex === index ? currentPlayer : item)));

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const draw = () => {
    if (values.every((item) => item !== '')) alert('Houve um empate');
  };

  function winner() {
    const waysToWin = [
      // vertical
      [values[0], values[1], values[2]],
      [values[3], values[4], values[5]],
      [values[6], values[7], values[8]],

      // horizontal
      [values[0], values[3], values[6]],
      [values[1], values[4], values[7]],
      [values[2], values[5], values[8]],

      // diagonal
      [values[0], values[4], values[8]],
      [values[2], values[4], values[6]],
    ];

    waysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === 'O')) alert('O venceu!');
      if (cells.every((cell) => cell === 'X')) alert('X venceu!');
    });

    draw();
  }

  useEffect(winner, [values]);

  return (
    <Container>
      <h1>Jogo da Velha</h1>
      <Game>
        {values.map((item, index) => (
          <Button block={`${item}`} key={String(index)} onClick={() => handleClick(index)}>{item}</Button>
        ))}
      </Game>
    </Container>
  );
}

export default Jogo;
