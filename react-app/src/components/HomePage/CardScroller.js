import styled from 'styled-components';

const Scroller = styled.div`
    width: 1080px;
    height: 250px;

    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    gap: 20px;
    overflow-x: scroll;
    overflow-y: hidden;

    @media screen and (max-width: 1240px) {
        width: 740px;
    }

    @media screen and (max-width: 1000px) {
        width: 550px;
    }
`

function CardScroller({children}) {


    return (
        <Scroller>
            {children}
        </Scroller>
    )
}

export default CardScroller;
