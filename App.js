import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [goal, setGoal] = useState('');
  const [target, setTarget] = useState('');
  const [progress, setProgress] = useState([]);

  const handleAddProgress = () => {
    if (goal && target) {
      const newProgress = [...progress, { goal, target: parseInt(target), achieved: 0 }];
      setProgress(newProgress);
      setGoal('');
      setTarget('');
    }
  };

  const handleLogProgress = (index) => {
    const newProgress = progress.map((item, i) => {
      if (i === index) {
        return { ...item, achieved: item.achieved + 1 };
      }
      return item;
    });
    setProgress(newProgress);
  };

  const handleDeleteProgress = (index) => {
    const newProgress = progress.filter((_, i) => i !== index);
    setProgress(newProgress);
  };

  const getProgressPercentage = (achieved, target) => {
    return target > 0 ? (achieved / target) * 100 : 0;
  };

  const getStatusMessage = (percentage) => {
    if (percentage === 100) {
      return "Goal completed!";
    } else if (percentage > 75) {
      return "Well done!";
    } else if (percentage > 50) {
      return "Keep going!";
    } else {
      return "";
    }
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Set a new goal"
      />
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Set target (e.g., 30)"
      />
      <button onClick={handleAddProgress}>Add Goal</button>

      <h2>Progress</h2>
      <table>
        <thead>
          <tr>
            <th>Goal</th>
            <th>Target</th>
            <th>Achieved</th>
            <th>Progress (%)</th>
            <th>Status</th>
            <th>Log Progress</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((item, index) => {
            const percentage = getProgressPercentage(item.achieved, item.target);
            return (
              <tr key={index}>
                <td>{item.goal}</td>
                <td>{item.target}</td>
                <td>{item.achieved}</td>
                <td>{percentage.toFixed(2)}%</td>
                <td className={percentage > 75 ? "status" : ""}>
                  {getStatusMessage(percentage)}
                </td>
                <td>
                  <button onClick={() => handleLogProgress(index)}>Log</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteProgress(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
