import { useEffect, useState } from "react";

function Form(props:any){
  return (
    <div>
      <input data-testid="username" type="text" />
      <input data-testid="usersurname" type="text" />
      <input data-testid="usermail" type="text" />
      <input data-testid="usermsg" type="text" />
      <button data-testid="submit-btn"></button>
    </div>
  )
}

export default Form;