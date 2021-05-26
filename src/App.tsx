import './App.css';
import { useEffect, useState } from 'react';
import MyForm from './Form';

function App(props:any) {

  const [msg, setMsg] = useState("");
  const [label, setLabel] = useState("OK");


  const loadMsg = async ()=>{
    try{
      const response = await fetch(props.url);
      const data = await response.json();
      setMsg(data.msg);
    }catch(e){
      console.log(e);
      
      setMsg("error");
    }
  }; 

  const toggleLabel = () => {
    setLabel( label === "OK" ? "KO" : "OK");
  };

  useEffect( ()=> {loadMsg();}, []);

  return (
    <div className="App">
      {msg !== "" && <p data-testid="welcome-msg">{msg}</p>}
      <button data-testid="toggle-btn" onClick={ ()=> toggleLabel()}>{label}</button>
      <MyForm url={props.url} />
    </div>
  );
}

export default App;
