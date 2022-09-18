import stone from "./stone.svg";
import paper from "./paper.svg";
import scissors from "./scissors.svg";

import "./App.css";
import { useState } from "react";

const item = ["Rock", "Paper", "Scissor"];

function App() {
  const [winner, setWinner] = useState(null);
  const [computerSelection, setComputerSelection] = useState(null);
  const [userSelection, setUserSelection] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const compareSelection = {
    Rock: () => compareRock[lotto()](),
    Scissor: () => compareScissor[lotto()](),
    Paper: () => comparePaper[lotto()](),
  };

  const compareRock = {
    Rock: () => setWinner("Draw"),
    Scissor: () => {
      setWinner("User");
      setUserScore(userScore + 1);
    },
    Paper: () => {
      setWinner("Computer");
      setComputerScore(computerScore + 1);
    },
  };

  const compareScissor = {
    Rock: () => {
      setWinner("Computer");
      setComputerScore(computerScore + 1);
    },
    Scissor: () => setWinner("Draw"),
    Paper: () => {
      setWinner("User");
      setUserScore(userScore + 1);
    },
  };

  const comparePaper = {
    Rock: () => {
      setWinner("User");
      setUserScore(userScore + 1);
    },
    Scissor: () => {
      setWinner("Computer");
      setComputerScore(computerScore + 1);
    },
    Paper: () => setWinner("Draw"),
  };

  const lotto = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    const randomSelect = item[randomNumber];
    setComputerSelection(randomSelect);
    return randomSelect;
  };

  const imageClick = (selected) => {
    setUserSelection(selected);
    compareSelection[selected]();
  };

  const reset = () => {
    setUserSelection(null);
    setComputerSelection(null);
  };

  const scoreBoard = () => {
    return (
      <>
        <div className="score">
          User
          <div className="bigNumber">{userScore}</div>
        </div>
        <div className="score">
          Computer <div className="bigNumber">{computerScore}</div>
        </div>
      </>
    );
  };

  const renderImage = (item, name, enabled) => {
    return (
      <>
        <img
          src={name}
          onClick={() => (enabled ? imageClick(item) : null)}
          className={enabled ? "App-logo" : "disabledImage"}
          alt="logo"
        />
      </>
    );
  };

  const renderSelected = (firstItem, secondItem) => {
    const name = {
      Rock: { stone }.stone,
      Paper: { paper }.paper,
      Scissor: { scissors }.scissors,
    };

    const resetButton = (
      <button className="button" onClick={() => reset()} type="button">
        Play Again
      </button>
    );

    return (
      <div className="resultPage">
        <div className="result">
          <div className="text">Your Selection</div>
          <div>{renderImage(firstItem, name[firstItem], false)}</div>
        </div>
        <div className="result">
          <div className="text">Computer Selection</div>
          <div>{renderImage(secondItem, name[secondItem], false)}</div>
        </div>
        <div className="result">
          {winner === "User" ? (
            <>
              <p>{resetButton}</p>
              <span className="bigTextWon">YOU WON </span>
            </>
          ) : null}
        </div>
        <div className="result">
          {winner === "Computer" ? (
            <>
              <p>{resetButton}</p>
              <span className="bigTextLost">YOU LOST </span>
            </>
          ) : null}
        </div>
        <div className="result">
          {winner === "Draw" ? (
            <>
              <p>{resetButton}</p>
              <span className="bigTextDraw">Draw</span>
            </>
          ) : null}
        </div>
        {/* <button onClick={() => reset()} type="button">
          Play Again
        </button> */}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <div className="scoreBoard">{scoreBoard()}</div>
          {!userSelection ? (
            <div className="items">
              <div className="item">{renderImage(item[0], stone, true)}</div>
              <div className="item"> {renderImage(item[1], paper, true)}</div>
              <div className="item">
                {" "}
                {renderImage(item[2], scissors, true)}
              </div>
            </div>
          ) : (
            <div className="items">
              {renderSelected(userSelection, computerSelection)}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
