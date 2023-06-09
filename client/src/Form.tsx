import React, {useState} from "react";

import Input from "./Input";
import Button from "./Button";

function Form() {
    const [placeholder, placeholderInput] = useState("");
    const onChange = (str:string) =>{
        placeholderInput(str);
    };
    return(
        <form>
            <Input
                onChange = {onChange}
                placeholder = "Please write the reasoning for your decision."
                value = {placeholderInput}
            />
            <Button value="Submit" processing={false}/>
        </form>
    );
}

export default Form;