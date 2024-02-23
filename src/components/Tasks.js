// import React from 'react'
// import EditTaskModal from './EditTaskModal'

// export const Tasks = ({tasks, deleteTask, taskEdited}) => {

//     console.log('tasks length:::', tasks)
//     if (tasks.length === 0) return null
//     const getTotal = (e)=>{
//      let sum=0;
//      return sum;
//     }
//     const TaskRow = (task,index) => {
//         const total = getTotal(task);
//         return(
//               <tr key = {index} className={index%2 === 0?'odd':'even'}>
//                   <td>{task.breakfast}</td>
//                   <td>{task.lunch}</td>
//                     <td>{task.dinner}</td>
//                   <td>{task.kiraya}</td>
//                   <td>{task.personal}</td>
//                   <td>{task.healthy_food}</td>
//                   <td>{task.special}</td>
//                   <td>{task.other}</td>
//                   <td>{task.description}</td>
//                   <td>{total}</td>
//                   <td>
//                     <div className="row">
//                         <div className="col-md-3">
//                             <EditTaskModal task={task} taskEdited={taskEdited}/>
//                         </div>
//                         <div className="col-md-3">
//                           <button type="button" onClick={(e) => deleteTask(task._id)} className="btn btn-danger right">Delete</button>
//                         </div>
//                     </div>
//                   </td>
//               </tr>
//           )
//     }

//     const taskTable = tasks.map((task,index) => TaskRow(task,index))

//     return(
//         <div className="container">
//             <h2>Tasks</h2>
//             <table className="table table-bordered">
//                 <thead>
//                 <tr>
//                     <th>Task Id</th>
//                     <th>BreakFast</th>
//                     <th>Lunch</th>
//                     <th>Dinner</th>
//                     <th>Other</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                     {taskTable}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';

function QuizAttemptScreen(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    fetch('https://example.com/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-submit quiz when time runs out
      submitQuiz();
    }
  }, [remainingTime]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setUserAnswers(prevAnswers => {
      return {
        ...prevAnswers,
        [questionIndex]: answerIndex
      };
    });
  };

  const submitQuiz = () => {
    // TODO: Submit userAnswers to server and redirect to quiz result screen
  };

  return (
    <div>
      <h1>Quiz Attempt Screen</h1>
      <p>Time remaining: {remainingTime} seconds</p>
      {questions.length > 0 && (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].text}</p>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={`answer-${currentQuestionIndex}`}
                  value={index}
                  checked={userAnswers[currentQuestionIndex] === index}
                  onChange={() => handleAnswerChange(currentQuestionIndex, index)}
                />
                {answer}
              </label>
            </div>
          ))}
          <button onClick={submitQuiz}>Submit Quiz</button>
        </div>
      )}
    </div>
  );
}

export default QuizAttemptScreen;
