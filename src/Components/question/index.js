import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo';

import "./question.css";

const ADD_ANSWER_QUERY = gql`
  mutation AddAnswer($authorID: String!, $currentAnswer: String!, $questionID: Int!) {
    AddAnswer(authorID: $authorID, answer: $currentAnswer, question: $questionID) {
      authorID
      answer
      question
    }
  }
`;

const Question = ({ question, currentUser, onNextClicked }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const questionID = question.ID;
  const authorID = currentUser;
  const [currentAnswer, setCurrentAnswer] = useState('');

  const onOptionClicked = option => {
    setCurrentAnswer (option);
    setAnswered(true);
    setSelectedOption(option);
  };

  const resetQuestion = () => {
    setAnswered(false);
    setSelectedOption({});
    onNextClicked(selectedOption);
  };

  return (
      <div className="question">
        <section>
          <div className="question-text-holder">
            {answered &&
              <Mutation mutation={ADD_ANSWER_QUERY} >
                {(addAnswer) =>
                  <button onClick={()=>{
                    addAnswer({variables:{authorID:authorID, currentAnswer:currentAnswer,questionID:questionID}});
                    resetQuestion();
                  }}>Next</button>
                }
              </Mutation>
            }
            <h4 className="question-text">{question.question}</h4>
          </div>

          {JSON.parse(question.options).map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => onOptionClicked(option)}
                disabled={answered}
                className={`question-option
                ${selectedOption === option &&
                  "correct"}
                `}
              >
                <span>
                  {answered ? "✔" : (index+1)}
                </span>
                {option}
              </button>
            );
          })}
        </section>
      </div>
  );
};

export default Question;
