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

  const compareSelection = {
    Rock: () => compareRock[lotto()](),
    Scissor: () => compareScissor[lotto()](),
    Paper: () => comparePaper[lotto()](),
  };

  const compareRock = {
    Rock: () => setWinner("Draw"),
    Scissor: () => setWinner("User"),
    Paper: () => setWinner("Computer"),
  };

  const compareScissor = {
    Rock: () => setWinner("Computer"),
    Scissor: () => setWinner("Draw"),
    Paper: () => setWinner("User"),
  };

  const comparePaper = {
    Rock: () => setWinner("User"),
    Scissor: () => setWinner("Computer"),
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
      <>
        <div className="result">
          Your Selection{renderImage(firstItem, name[firstItem], false)}
        </div>
        <div className="result">
          Computer Selection{renderImage(secondItem, name[secondItem], false)}
        </div>
        <div className="result">
          {winner === "User" ? (
            <>
              <p>{resetButton}</p>
              <span className="bigTextWon">WON </span>
            </>
          ) : null}
        </div>
        <div className="result">
          {winner === "Computer" ? (
            <>
              <p>{resetButton}</p>
              <span className="bigTextLost">LOST </span>
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
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {!userSelection ? (
          <>
            <div className="items">{renderImage(item[0], stone, true)}</div>
            <div className="items"> {renderImage(item[1], paper, true)}</div>
            <div className="items"> {renderImage(item[2], scissors, true)}</div>
          </>
        ) : (
          <>{renderSelected(userSelection, computerSelection)}</>
        )}
      </header>
    </div>
  );
}

export default App;
