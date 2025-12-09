import Q1Image from './assets/Q1.png';
import React, { useState } from 'react';
import '../../shared/Quiz.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';
import Timg from "../../../../assets/Gif/Approve.Gif";
import Fimg from "../../../../assets/Gif/False.gif";

export const QuizPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [showSkip, setShowSkip] = useState(false);
  const [showtry, setshowtry] = useState(false);
  const [results, setResults] = useState({
    q1: null,
    q2: null,
    q3: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleTryAgain = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setResults({ q1: null, q2: null, q3: null });
    setShowSkip(true);
    setshowtry(true);

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => (radio.checked = false));
  };


  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }
    const correctAnswers = { q1: "0", q2: "2", q3: "1" };
    const newResults = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };

    setResults(newResults);

    setShowSkip(true);
    setshowtry(true);
    const score = Object.values(newResults).filter(isCorrect => isCorrect).length;
    const totalQuestions = Object.keys(newResults).length;
    const scoreString = `${score}/${totalQuestions}`;

    const resultsHtml = `
      Q1: ${newResults.q1 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q2: ${newResults.q2 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q3: ${newResults.q3 ? '✅ Correct' : '❌ Wrong'}<br>
      <hr>
      <p><strong>Score:</strong> ${score}/${totalQuestions}</p>
    `;
    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
        });
    } else {
      ValidationAlert.error("Try again", "", scoreString)
    }
  };
  const handleSkip = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
  };
  const renderAnswerGif = (question, optionValue) => {
    if (results[question] === null) return null; // لم يتم الضغط على Submit
    if (answers[question] !== optionValue) return null; // لم يتم اختيار هذا الخيار
    return results[question] ? (
      <img src={Timg} alt="correct" className="answer-gif" />
    ) : (
      <img src={Fimg} alt="wrong" className="answer-gif" />
    );
  };
  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />

          <div className="content">
            <div className="Q1">
              <span>Why was Sid angry?</span>
              <ul>
                <li>
                  Bob missed the shot.
                  <input type="radio" name="q1" value="0" onChange={handleChange} />
                  {renderAnswerGif('q1', '0')}
                </li>
                <li>
                  Bob didn’t want to play.
                  <input type="radio" name="q1" value="1" onChange={handleChange} />
                  {renderAnswerGif('q1', '1')}
                </li>
                <li>
                  Sid fell downn
                  <input type="radio" name="q1" value="2" onChange={handleChange} />
                  {renderAnswerGif('q1', '2')}
                </li>
              </ul>
            </div>

            {/* Question 2 */}
            <div className="Q2">
              <span>Who told Sid he should encourage others?</span>
              <ul>
                <li>
                  His mum
                  <input type="radio" name="q2" value="0" onChange={handleChange} />
                  {renderAnswerGif('q2', '0')}
                </li>
                <li>
                  His sister
                  <input type="radio" name="q2" value="1" onChange={handleChange} />
                  {renderAnswerGif('q2', '1')}
                </li>
                <li>
                  His brother
                  <input type="radio" name="q2" value="2" onChange={handleChange} />
                  {renderAnswerGif('q2', '2')}
                </li>
              </ul>
            </div>

            {/* Question 3 */}
            <div className="Q3">
              <span>What did Sid say to Bob in the end?</span>
              <ul>
                <li>
                  ‘ Don’t play with me again.’
                  <input type="radio" name="q3" value="0" onChange={handleChange} />
                  {renderAnswerGif('q3', '0')}
                </li>
                <li>
                  It’s okay, Bob. You tried.’
                  <input type="radio" name="q3" value="1" onChange={handleChange} />
                  {renderAnswerGif('q3', '1')}
                </li>
                <li>
                  ‘ I want to go home.’
                  <input type="radio" name="q3" value="2" onChange={handleChange} />
                  {renderAnswerGif('q3', '2')}
                </li>
              </ul>
            </div>

            <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>
            {showSkip && (
              <button type="button" className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
            )}

            {showtry && (
              <button className="try-btn" onClick={handleTryAgain}>
                Try again
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizPage;
