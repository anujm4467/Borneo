import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.."/>

        <ul id="myUL">
          <li><a href="#">Adele</a></li>
          <li><a href="#">Agnes</a></li>

          <li><a href="#">Billy</a></li>
          <li><a href="#">Bob</a></li>

          <li><a href="#">Calvin</a></li>
          <li><a href="#">Christina</a></li>
          <li><a href="#">Cindy</a></li>
        </ul>
    </div>
  );
}

export default App;
