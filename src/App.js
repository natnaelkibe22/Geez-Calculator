import logo from './logo.svg';
import './App.css';

function Numbers(props) {
  return <button type="button" className="numbers">{props.name}</button>;
}


function App() {
  return (
    <div className="App">
      <div className="calculator-section">
        <div>
          <Numbers name="nati" />
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>

      
    </div>
  );
}

export default App;
