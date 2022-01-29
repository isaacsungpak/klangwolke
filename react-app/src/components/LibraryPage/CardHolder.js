import styled from 'styled-components';

const Holder = styled.div`
    width: 1080px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    justify-items: center;
    // align-items: center;

    @media screen and (max-width: 1240px) {
        width: 740px;
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 1000px) {
        width: 550px;
        grid-template-columns: repeat(3, 1fr);
    }
`

function CardHolder({children}) {


    return (
        <Holder>
            {children}
        </Holder>
    )
}

export default CardHolder;
