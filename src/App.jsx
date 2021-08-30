import React from 'react'
import styled from 'styled-components'

import HomePage from './pages/HomePage'

const ContentDiv = styled.div`
    width: 95rem;
    margin: 0 auto;

    @media (max-width: 1007px) {
        width: 75rem;
    }

    @media (max-width: 640px) {
        width: 45rem;
    }
`

const App = () => {
    return (
        <ContentDiv>
            <HomePage />
        </ContentDiv>
    )
}

export default App