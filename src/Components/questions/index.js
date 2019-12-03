import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import Question from '../question';

import './questions.css';

const Questions = ({ questions}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const authorID = window.location.pathname.replace("/", "");

  const onNextClicked = (selectedOption) => {
    if (currentQuestion.answer === selectedOption) setScore(score + 1);
    if (currentIndex + 1 > questions.length - 1) {
      setShowFinished(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  return questions.length ? (
    <div>
      {showFinished ? (
        <div className="results">
          <h3>
            No more questions in current quiz. Please wait for next quiz to start!!!
          </h3>
        </div>
      ) : (
        <Question
          onNextClicked={onNextClicked}
          question={currentQuestion}
          currentUser={authorID}
          key={currentQuestion.id}
        />
      )}
    </div>
  ) : (
    <p>Loading</p>
  );
};

const GET_QUESTIONS_QUERY = gql`
  {
    quizzes (isActive: 1){
      quizQuestions {
        ID
        question
        options
        answer
        area
      }
    }
  }
`;

export default graphql(GET_QUESTIONS_QUERY, {
  props: (result) => {
    const { loading, data } = result;
    let items = [];
    if (data && data.quizzes) items = data.quizzes[0].quizQuestions;
    return {
      loading,
      questions: items,
    };
  },
}) (Questions);
