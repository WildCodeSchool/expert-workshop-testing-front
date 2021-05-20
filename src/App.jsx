import { useEffect, useState } from 'react';
import {MyForm} from "./Form";
import './App.css';

function App() {

  const [msg, setMsg] = useState("");

  useEffect( 
    ()=> {
      fetch("/msg").then(
        (response)=>{
          response.json().then( 
            (value)=>{
              setMsg(value.msg);
            }
          )
        }
      )
    }, 
    []
  )
  return (
    <div className="App">
      <p data-testid="welcome-msg">{{msg}}</p>
      <MyForm url={url} />
    </div>
  );
}

export default App;
