import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    board,
    disabledLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  // useCallback prevents too many updates
  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currAttempt]
  );

  // detect keyboard event, have to removeEventListener on return
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  console.log(disabledLetters);

  return (
    <div className='keys flex flex-col items-center pb-5'>
      <div className='line1 flex gap-1 my-0.5 w-fit'>{keys1.map((key) => {
        return <Key keyVal={key} threeKeyVal={key} fourKeyVal={key} />;
      })}</div>
      <div className='line2 flex gap-1 my-0.5 w-fit'>
        {keys2.map((key) => {
          return <Key keyVal={key} threeKeyVal={key} fourKeyVal={key} />;
        })}
      </div>
      <div className='line3 flex gap-1 my-0.5 w-fit'>
        {/* <Key keyVal={"ENTER"} bigKey /> */}
        {keys3.map((key) => {
          return <Key keyVal={key} threeKeyVal={key} fourKeyVal={key} />;
        })} 
             
        {/* <Key keyVal={"DELETE"} bigKey /> */}
        
      </div>
      <Key keyVal={"ENTER"} bigKey />
      <Key keyVal={"DELETE"} bigKey />

    </div>
  )
}

export default Keyboard