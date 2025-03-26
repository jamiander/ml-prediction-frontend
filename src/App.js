import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [successRate, setSuccessRate] = useState(0);
  const [grade, setGrade] = useState(0);
  const [employed, setEmployed] = useState(false);
  const getSuccess = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/predict?grade=${grade}&employed=${employed}`);
      console.log(response);
      setSuccessRate(response.data.predictedSuccessRate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  return (
    <div className="App">
      <h1>Student Graduation Rate Prediction</h1>
      
      <div className="form-group">
        <label htmlFor="grade">Student Grade (0-100)</label>
        <input
          id="grade"
          className="grade-input"
          type="number"
          placeholder="Enter grade"
          min={0}
          max={100}
          value={grade}
          onChange={(e) => setGrade(parseInt(e.target.value) || 0)}
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
        Predict Graduation Rate
      </button>

      <div className="result">
        <div className="result-label">Predicted Graduation Rate</div>
        <div className="result-value">{successRate}%</div>
      </div>
    </div>
    );
    }
export default App;
