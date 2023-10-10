import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'  //I also really like this!

export function Form(props) {

  const {inputChange, form, postQuiz} = props;
  
  const emptyCheck = () => {
    if(form.newQuestion.trim().length < 1 || form.newTrueAnswer.trim().length < 1 || form.newFalseAnswer.trim().length < 1){
      return true;
    }
      return false;
  }

  const onChange = e => {
    const {name, value} = e.target;
    inputChange({name, value});
  }

  const onSubmit = () => {

    const newQuestion = form.newQuestion;
    const newTrueAnswer = form.newTrueAnswer;
    const newFalseAnswer = form.newFalseAnswer;

    postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input name="newQuestion" maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={form.newQuestion}/>
      <input name="newTrueAnswer" maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={form.newTrueAnswer}/>
      <input name="newFalseAnswer" maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={form.newFalseAnswer}/>
      <button 
        id="submitNewQuizBtn" 
        type="submit"
        disabled={emptyCheck()}
      >Submit new quiz</button>
    </form>
  )
}

//I have to remember this type of logic down here - it's so simple..
export default connect(st => st, actionCreators)(Form)
