import React from 'react';

type Usertext = {
  onChange: (str:string)=>void;
  placeholder: string;
  value?: string;
};
function Input({ onChange, placeholder, value=""}:Input){
  return (
    <input
    onChange = {event => onChange(event.target.value)}
    placeholder = {placeholder}
    value = {value} 
    />
  );
}
export default Input;