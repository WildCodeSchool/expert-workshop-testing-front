import { useState } from 'react';

function MyForm(props:any) {

  const [msg, setMsg] = useState(null);

  const submit = async () => {
    const response = await fetch(props.url); 
    const data = await response.json();
    setMsg(data.msg);
    if( props.onSubmit)
      props.onSubmit();
  };

  return (
    <div className="Form">
        {msg && <p data-testid="server-msg">{msg}</p>}
        <input type="text" data-testid="name-field" />
        <input type="text" data-testid="surname-field" />
        <input type="text" data-testid="address-field" />
        <input type="text" data-testid="msg-field" />
        <input type="submit" data-testid="submit-btn" onClick={ ()=>submit() } />
    </div>
  );
}

export default MyForm;
