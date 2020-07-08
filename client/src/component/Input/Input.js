import React from 'react';

import './Input.css';

const Input = ({ setmsg, sendMessage, msg }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={msg}
      onChange={({ target: { value } }) => setmsg(value)}
      onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;