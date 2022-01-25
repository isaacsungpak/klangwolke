import styled from 'styled-components';
import PammerWait from './images/Pammer_Loading.gif';

const WaitStyling = styled.div`
    position: absolute;
    z-index: ${props => props.show ? '1000' : '-10'};
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    filter: drop-shadow(3px 4px 5px rgba(0, 0, 0, 0.5));

    #waiting {
        width: 200px;
        height: 200px;
    }
`

function WaitingAnimation({show}) {
    return (
    <WaitStyling show={show}>
        <img id='waiting' src={PammerWait} alt="Waiting Animation"/>
    </WaitStyling>
    )
}

export default WaitingAnimation;
