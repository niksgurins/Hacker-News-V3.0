import React from 'react'
import styled from 'styled-components'

import HomePage from './pages/HomePage'

const ContentDiv = styled.div`
    width: 95rem;
    margin: 0 auto;
`

const App = () => {
    return (
        <ContentDiv>
            <HomePage />
        </ContentDiv>
    )
}

export default App