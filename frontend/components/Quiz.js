import React from 'react';
import { connect } from 'react-redux';
import { selectAnswer } from '../state/action-creators';


function Quiz(props) {
  const handleAnswerClick = (idx) => {
    props.selectAnswer(idx);
  };

  return (
    <div id="wrapper">
      <div id="quiz">
        <h2>Quiz</h2>
        {props.quiz ? (
          <div>
            <h3>{props.quiz.question}</h3>
            <div id="quizAnswers">
              {props.quiz.answers.map((answer, index) => (
                <div
                  className={`answer ${
                    index === props.selectedAnswer ? "selected" : ""
                  }`}
                  key={index}
                >
                  {answer.text}
                  <button onClick={() => handleAnswerClick(index)}>
                    {index === props.selectedAnswer ? "SELECTED" : "Select"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          "Loading next quiz..."
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, { selectAnswer })(Quiz)
