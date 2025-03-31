import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [successRate, setSuccessRate] = useState(0);
  const [grade, setGrade] = useState('');
  const [employed, setEmployed] = useState(false);
  console.log('employed', employed);
  const [married, setMarried] = useState(false);
  console.log('married', married);
  const [age, setAge] = useState('');
  const getSuccess = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/predict?grade=${grade || 0}&employed=${employed}&married=${married}&age=${age}`);
      console.log('response', response);
      setSuccessRate(response.data.graduationProbability);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  return (
    <div className="App">
      <h1>Student Graduation Probability Prediction</h1>
      
      <div className="form-group">
        <label htmlFor="grade">Student GPA</label>
        <input
          id="grade"
          className="form-input"
          type="number"
          placeholder="Enter GPA (e.g. 3.5)"
          min={0}
          max={4}
          step="0.1"
          value={grade}
          onChange={(e) => setGrade(e.target.value === '' ? '' : parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Student Age</label>
        <input
          id="age"
          className="form-input"
          type="number"
          placeholder="Enter Age (e.g. 18)"
          min={18}
          max={40}
          step="1"
          value={age}
          onChange={(e) => setAge(e.target.value === '' ? '' : parseFloat(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Employment Status</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="employment"
              value="false"
              checked={!employed}
              onChange={() => setEmployed(false)}
            />
            Not Employed
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="employment"
              value="true"
              checked={employed}
              onChange={() => setEmployed(true)}
            />
            Employed
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Marital Status</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="maritalStatus"
              value="false"
              checked={!married}
              onChange={() => setMarried(false)}
            />
            Not Married
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="maritalStatus"
              value="true"
              checked={married}
              onChange={() => setMarried(true)}
            />
            Married
          </label>
        </div>
      </div>

      <button className="predict-button" onClick={getSuccess}>
        Predict Graduation Probability
      </button>

      <div className="result">
        <div className="result-value">{(successRate * 100).toFixed(1)}%</div>
        <div className="result-label">Probability that the student will graduate</div>
      </div>
    </div>
    );
    }
export default App;
