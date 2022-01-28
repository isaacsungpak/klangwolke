import styled from "styled-components";

const Tab = styled.div`
    width: 100%;
    height: 10px;
    display: flex;
    border-bottom: 1px solid #DDD;
    color: black;
    background-color: white;
`

function PlaylistCard({playlist}) {

    return(
        <Tab>
            {playlist.title}
        </Tab>
    )
}

export default PlaylistCard
