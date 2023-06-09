type Props = {
    value: "Submit";
    processing: boolean;
};

function Button({value, processing}: Props){
    return <button>{processing ? "Processing..." : value}</button>;
}

export default Button;