import React, { useState } from 'react';
import './App.css';

//imports
//import { useSpring, animated } from 'react-spring'
import Dropdown from "./components/dropdown";
import QuestionFront from "./components/questionFront";
import QuestionBack from "./components/questionBack";
import axios from "axios";

let Loader = require('react-loader');

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [correctAnswer, setcorrectAnswer] = useState(0);


  const defaultValues = [
    "Pick a number",
    "Pick a category",
    "Pick a difficulty",
    "Pick a type"
  ]

  const handleClick = () => {
    if (!!category && !!difficulty && !!number && !!type) {
      setLoading(true);
      axios(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`).then(({ data }) => {
        if (data.results) {
          let results = data.results;
          console.log(results);
          setQuestions(results);
          setLoading(false);
          setcorrectAnswer(0);
        }
        //console.log(questions);
        //console.log(number, category, difficulty, type);
      })
    }
  }

  const handleAnswer = (ans, questionInfo) => {
    if (ans === questionInfo.correct_answer) {
      setcorrectAnswer(correctAnswer + 1);
      setTimeout(function () {
        setQuestions(questions.filter((q) => q.question !== questionInfo.question))
      }, 750)
    }
    else {

    }
    // console.log(correctAnswer);
  }

  return (
    <div className="App">
      <header>
        <h1>Are you ready for Quiz ?</h1>
        <h3>Select quiz features, and Let's start</h3>
      </header>
      <main>
        <div className="dropdowns">
          <Dropdown handleEdit={setNumber} defValue={defaultValues[0]} data={"Numbers"} />
          <Dropdown handleEdit={setCategory} defValue={defaultValues[1]} data={"Category"} />
          <Dropdown handleEdit={setdifficulty} defValue={defaultValues[2]} data={"Difficulty"} />
          <Dropdown handleEdit={setType} defValue={defaultValues[3]} data={"Type"} />
          <button className="btn" onClick={handleClick} type="submit">Submit</button>
        </div>

        {loading ?
          <Loader /> :
          <div className="container">
            <div className="correct-answer">Correct Answer Count : {correctAnswer}</div>
            <div className="questions">
              {
                questions.map((question, index) => {
                  return (
                    <div key={index} className="question">
                      <div className="question-inner-card">
                        <QuestionFront />
                        <QuestionBack questionInfo={question} handleAnswer={handleAnswer} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }

      </main>
    </div>
  );
}

export default App;
