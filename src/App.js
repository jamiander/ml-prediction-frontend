import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [successRate, setSuccessRate] = useState(0);
  const [grade, setGrade] = useState('');
  const [employed, setEmployed] = useState(false);
  const getSuccess = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/predict?grade=${grade || 0}&employed=${employed}`);
      setSuccessRate(response.data.probability);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  return (
    <div className="App">
      <h1>Student Graduation Probability Prediction</h1>
      
      <div className="form-group">
        <label htmlFor="grade">Student GPA (0-4)</label>
        <input
          id="grade"
          className="grade-input"
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
        <label>Employment Status</label>
        <div className="employment-status">
          <label className="radio-label">
            <input
              type="radio"
              name="employment"
              value="false"
              checked={!employed}
              onChange={(e) => setEmployed(e.target.value === 'true')}
            />
            Not Employed
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="employment"
              value="true"
              checked={employed}
              onChange={(e) => setEmployed(e.target.value === 'true')}
            />
            Employed
          </label>
        </div>
      </div>

      <button className="predict-button" onClick={getSuccess}>
        Predict Graduation Probability
      </button>

      <div className="result">
        <div className="result-value">{successRate}% </div>
        <div className="result-label">Probability that the student will graduate</div>
      </div>
    </div>
    );
    }
export default App;
