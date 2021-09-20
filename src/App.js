import Home from "./Home";
import {useState} from 'react'
function App() {
  const [darkTheme, setDarkTheme] = useState(true)
  return (
    <div className="App">
            <Home path='/' darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
    </div>
  );
}

export default App;
