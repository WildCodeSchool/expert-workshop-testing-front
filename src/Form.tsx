import { useEffect, useState } from "react";

function Form(props:any){

  const [msg, setMsg] = useState(""); 

  const clickHandler = async ()=>{
    if( props.url ){
      const response = await fetch(props.url);
      const data = await response.json();
      setMsg(data.msg)
    }
  }

  return (
    <div>
      { msg !== "" && <p data-testid="server-msg">{msg}</p>}
      <input data-testid="username" type="text" />
      <input data-testid="usersurname" type="text" />
      <input data-testid="usermail" type="text" />
      <input data-testid="usermsg" type="text" />
      <button data-testid="submit-btn" onClick={ clickHandler }>OK</button>
    </div>
  )
}

export default Form;