import { Btn } from "./ButtonStyle";

const Button = ({ children, outline, clickEvent }) => {
    return(
        <Btn outline={outline || ''} onClick={clickEvent}>
            {children}
        </Btn>
    )
}

export default Button;