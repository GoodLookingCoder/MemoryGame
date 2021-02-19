import './App.css';
import logo from "./components/img/logo.png"
import {useState } from "react"
import Header from "./components/Header"
import Cards from "./components/Cards"

function App() {
  const [level, setLevel] = useState({num:1, imgs:4})
  const [score, setScore] = useState({actual: 0, highest: 0})

  const updateScore = (reset) => {
    if(reset){
      setScore({...score, actual: 0})
      return
    }
    if(score.actual===score.highest){
      setScore({actual: score.actual + 1, highest: score.actual + 1})
    }else{
      setScore({...score, actual: score.actual + 1})
    }
  }

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt=""/>
      </div>
      <Header level={level} score={score} />
      <Cards updateScore={updateScore} level={level} setLevel={setLevel} />
    </div>
  );
}

export default App;
