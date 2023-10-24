import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet, threeBoardDefault, fourBoardDefault, generateFourLetterSet } from "./Words";
import { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";


export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [threeBoard, setThreeBoard] = useState(threeBoardDefault)
  const [fourBoard, setFourBoard] = useState(fourBoardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });  
  
  // save these for a four letter game in future
  // const [active, setActive] = useState(boardDefault)
  // const [fourLetterSet, setFourLetterSet] = useState(new Set());

  console.log("is game over?", gameOver.gameOver);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      console.log("word", words.todaysWord)
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };



  return (
    <div className="App">
      <nav className="flex justify-center items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
        <h1 className="font-bold text-5xl w-full">Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          threeBoard,
          setThreeBoard,
          fourBoard,
          setFourBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
        className='h-16 w-16 grid place-items-center p-0 m-0 font-bold text-2xl rounded-sm'
      >
        <div className="game max-w-[800px] max-h-[600px] mt-[-96px] w-full mx-auto text-center flex flex-col justify-center py-2 px-10">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
