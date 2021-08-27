import React from 'react'
import styled from 'styled-components'
import { CaretUpFill, CaretDownFill, ChatLeftDotsFill } from 'react-bootstrap-icons'
import moment from 'moment'

const UpvoteDiv = styled.div`
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #909198;
    transition: color .15s ease-out;
`

const StoryHeading = styled.h3`
    display: flex;
    align-items: flex-end;
    margin: 0;
    text-align: left;
    color: #909198;
    transition: color .15s ease-out;
`

const StyledStory = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr 1fr;
    color: white;
    padding: 1rem;
    font-size: 1.6rem;
    column-gap: 2rem;
    border-bottom: 1px solid #909198; 
    background: linear-gradient(-45deg, #2f3037 50%, #202226 50%) right;
    background-size: 208%;
    transition: .2s linear;
    
    &:hover {
        background-position: left;
    }

    &:hover ${StoryHeading}, &:hover ${UpvoteDiv} {
        color: #FFF;
    }
`

const StoryDetailsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #909198;
    font-size: 1.5rem;
`

const CommentsDiv = styled.div`
    display: flex;
    align-items: inherit;
    cursor: pointer;
`

const Story = ({ 
    id = new Date().toString(), 
    by = 'Default user', 
    time, // moment defaults no time being passed as Invalid Date
    title = 'Default title', 
    url = '', 
    score = 0, 
    descendants = 0 
}) => {
    const renderTitle = () => {
        return url === '' ? title : <a href={url}>{title}</a>;
    }

    return (
        <StyledStory key={id}>
            <UpvoteDiv data-testid='upvoteDiv'>
                <CaretUpFill size={20} />
                <p>{score}</p>
                <CaretDownFill size={20} />
            </UpvoteDiv>
            <StoryHeading data-testid='storyHeading'>{renderTitle()}</StoryHeading>
            <StoryDetailsDiv data-testid='storyDetailsDiv'>
                <p>{`by ${by} ${moment(new Date(time * 1000), 'YYYYMMDD').fromNow()}`}</p>
                <CommentsDiv data-testid='comment'>
                    <p style={{"paddingRight": "0.5rem"}}>{descendants}</p>
                    <ChatLeftDotsFill size={20} />
                </CommentsDiv>
            </StoryDetailsDiv>
        </StyledStory>
    )
}

export default Story