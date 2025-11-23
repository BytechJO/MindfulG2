import Q1Image from './assets/Q1.png';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import './StoryPage.css';

export const QuizPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      Swal.fire({ icon: 'warning', title: 'Incomplete', text: 'Please answer all questions before submitting!' });
      return;
    }
    const correctAnswers = { q1: "2", q2: "0", q3: "1" };
    const results = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };
    const score = Object.values(results).filter(isCorrect => isCorrect).length;
    const totalQuestions = Object.keys(results).length;
    const resultsHtml = `
      Q1: ${results.q1 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q2: ${results.q2 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q3: ${results.q3 ? '✅ Correct' : '❌ Wrong'}<br>
      <hr>
      <p><strong>Score:</strong> ${score}/${totalQuestions}</p>
    `;
    if (score === totalQuestions) {
      Swal.fire({ title: 'Excellent! All Correct!', html: resultsHtml, icon: 'success', confirmButtonText: 'Continue', confirmButtonColor: '#3085d6' })
        .then(() => { navigate('/feedBack'); });
    } else {
      Swal.fire({ title: 'Results', html: resultsHtml, icon: 'info', showCancelButton: true, confirmButtonText: 'Continue', cancelButtonText: 'Try Again', confirmButtonColor: '#3085d6', cancelButtonColor: '#b23131ff', reverseButtons: true })
        .then((result) => { if (result.isConfirmed) { navigate('/feedBack'); } });
    }
  };

  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />
          
          <div className="content">
            <div className="Q1">
              <span>What did the boys play with?</span>
              <ul>
                <li>Toy cars <input type="radio" name="q1" value="0" onChange={handleChange} /></li>
                <li>A teddy <input type="radio" name="q1" value="1" onChange={handleChange}/></li>
                <li>Toy dinosaurs<input type="radio" name="q1" value="2" onChange={handleChange}/></li>
              </ul>
            </div>
            
            <div className="Q2">
              <span>What happened to the toy dinosaur?</span>
              <ul>
                <li>It broke. <input type="radio" name="q2" value="0" onChange={handleChange}/></li>
                <li>It did not break. <input type="radio" name="q2" value="1" onChange={handleChange}/></li>
                <li>It got lost. <input type="radio" name="q2" value="2" onChange={handleChange}/></li>
              </ul>
            </div>
            
            <div className="Q3" >
              <span>What did Simon say to Jad at the end of the story?</span>
              <ul>
                <li>I want a dinosaur toy<input type="radio" name="q3" value="0" onChange={handleChange}/></li>
                <li>I am sorry<input type="radio" name="q3" value="1" onChange={handleChange}/></li>
                <li>I want to go home<input type="radio" name="q3" value="2" onChange={handleChange}/></li>
              </ul>
            </div>

            <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizPage;
