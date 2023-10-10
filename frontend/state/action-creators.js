// ❗ You don't need to add extra action creators to achieve MVP
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types.js';

import axios from 'axios';



export function moveClockwise() {
  return { type: MOVE_CLOCKWISE }
 }

export function moveCounterClockwise() { 
  return { type: MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(selection) {
  return { type: SET_SELECTED_ANSWER, payload: selection}
}

export function setMessage(msg) { 
  return { type: SET_INFO_MESSAGE, payload: msg }
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz }
 }

export function inputChange({name, value}) {
  return { type: INPUT_CHANGE, payload: {name, value} }
 }

export function resetForm() {
  return { type: RESET_FORM }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data })
      })
      .catch((err) => { console.log({err}) })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quiz, answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer',{ "quiz_id" : `${quiz}`, "answer_id": `${answer}` })
      .then((res) => {
        dispatch({type: SET_SELECTED_ANSWER, payload: null})
        dispatch({type: SET_INFO_MESSAGE, payload: res.data.message})
        dispatch(fetchQuiz())
      })
      .catch((err) => {console.log({err})})
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(question, trueAns, falseAns) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { "question_text": `${question}`, "true_answer_text": `${trueAns}`, "false_answer_text": `${falseAns}` })
      .then(() => {
        dispatch({type: SET_INFO_MESSAGE, payload: `Congrats: "${question}" is a great question!`})
        dispatch({type: RESET_FORM})
      })
      .catch((err) => {
        ({type: SET_INFO_MESSAGE, payload: err.message})
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
