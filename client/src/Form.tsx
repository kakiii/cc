import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

function Form() {
  const [placeholder, setPlaceholder] = useState("");

  const onChange = (str:string) => {
    setPlaceholder(str);
  };

  return (
    <form>
      <Input
        onChange={onChange}
        placeholder="Please write the reasoning for your decision."
        value={placeholder}
      />
      <Button value="Submit" processing={false} />
    </form>
  );
}

export default Form;
