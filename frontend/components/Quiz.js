import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators';

function Quiz(props) {
  //deconstruct my props here
  const { quiz, selectedAnswer, fetchQuiz, postAnswer, selectAnswer } = props

  //had to implement this useEffect to help with the fetch
  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    }
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const quizID = quiz.quiz_id;
      const answerID = selectedAnswer === 1 ? quiz.answers[0].answer_id : quiz.answers[1].answer_id;
      postAnswer(quizID, answerID);
    }
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            {quiz.answers.map((answer, index) => (
              <div
                key={answer.answer_id}
                className={`answer ${
                  selectedAnswer === index + 1 ? 'selected' : ''
                }`}
              >
                {answer.text}
                <button onClick={() => selectAnswer(index + 1)}>
                  {selectedAnswer === index + 1 ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            id="submitAnswerBtn"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Submit answer
          </button>
        </>
      ) : (
        <div>Loading next quiz...</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => state; //Woah, this works so much better!!!!

const mapDispatchToProps = {
  fetchQuiz, 
  postAnswer, 
  selectAnswer
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
