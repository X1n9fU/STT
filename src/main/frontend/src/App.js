import './App.css';
import axios from 'axios';

function App() {

  var sendData = JSON.stringify({
    "currentX" : "1111",
    "currentY" : "2222",
    "destinationX" : "3333",
    "destinationY" : "4444"
  })




  const handleClick = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8082/taxi/call',
      data: sendData,
      headers: {
            'Content-Type': 'application/json'
      }
    }).catch(error => {
      console.error('오류가 발생했습니다:', error);
    });
  }

  return (
    <div>
      <button onClick={handleClick} style={{fontSize:"35px"}}>
        Send
      </button>
    </div>
  );
}

export default App;