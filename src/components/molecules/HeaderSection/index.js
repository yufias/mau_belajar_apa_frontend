import { 
    Header, 
    HeaderItem, 
    HeaderTitle, 
    HeaderUpdated 
} from "./HeaderSectionStyle";
import Button from "../../atoms/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'

const HeaderSection = () => {
    return (
        <Header>
            <HeaderItem>
                <HeaderTitle>Belajar dan praktek cinematic videography</HeaderTitle>
                <HeaderUpdated>Last edited 18 October 2021 | 13:23</HeaderUpdated>
            </HeaderItem>
            <HeaderItem>
                <Button outline>
                    <FontAwesomeIcon icon={faEye} style={{ marginRight: '4px' }} />
                    <span>Preview</span>
                </Button>
            </HeaderItem>
        </Header>
    )
}

export default HeaderSection;