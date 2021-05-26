import { useEffect, useState } from "react";

function Form(props:any){

  const [display, setDisplay] = useState(false); 
  const clickHandler = ()=>{
    setDisplay(true);
  }

  return (
    <div>
      { display && <p data-testid="server-msg">OK</p>}
      <input data-testid="username" type="text" />
      <input data-testid="usersurname" type="text" />
      <input data-testid="usermail" type="text" />
      <input data-testid="usermsg" type="text" />
      <button data-testid="submit-btn" onClick={ clickHandler }>OK</button>
    </div>
  )
}

export default Form;