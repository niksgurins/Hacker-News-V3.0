import React from 'react'
import styled from 'styled-components'
import { CaretUpFill, CaretDownFill, ChatLeftDotsFill } from 'react-bootstrap-icons'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'

const StoryNumber = styled.div`
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    color: #909198;
`

const UpvoteDiv = styled.div`
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #909198;
    transition: color .2s linear;

    p {
        font-size: 1.2rem;
        font-weight: 800;
    }

    svg:hover {
        cursor: pointer;
    }
`

const StoryHeading = styled.h3`
    display: flex;
    align-items: flex-end;
    margin: 0;
    text-align: left;
    color: #909198;
    transition: color .2s linear;

    @media (max-width: 1007px) {
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
    }

    a {
        color: #909198;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`

const StoryDetailsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #909198;
    font-size: 1.5rem;

    p span:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

const CommentsDiv = styled.div`
    display: flex;
    align-items: inherit;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

const StyledStory = styled.div`
    display: grid;
    grid-template-columns: 2.671rem auto 1fr;
    grid-template-rows: 1fr 1fr;
    color: white;
    padding: 1rem;
    font-size: 1.6rem;
    column-gap: 1.8rem;
    border-bottom: 1px solid #909198; 
    background: linear-gradient(-45deg, #2f3037 50%, #202226 50%) right;
    background-size: 215%;
    transition: .2s linear;
    
    &:hover {
        background-position: left;
    }

    &:hover ${StoryHeading}, &:hover ${StoryHeading} a, &:hover ${UpvoteDiv} {
        color: #FFF;
    }

    @media (max-width: 640px) {
        background-size: 223%;
    }
`

const StyledStorySkeleton = styled(Skeleton)`
    display: grid;
    grid-template-columns: 2.671rem auto 1fr;
    grid-template-rows: 1fr 1fr;
    color: white;
    padding: 1rem;
    font-size: 1.6rem;
    column-gap: 2rem;
    border-bottom: 1px solid #909198; 
    height: 80.09px;
`

const Story = ({ 
    by = 'Default user', 
    number = 0,
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
        <StyledStory>
            <StoryNumber data-testid='storyNumber'>
                <p>{number}</p>
            </StoryNumber>
            <UpvoteDiv data-testid='upvoteDiv'>
                <CaretUpFill size={20} />
                <p>{score}</p>
                <CaretDownFill size={20} />
            </UpvoteDiv>
            <StoryHeading data-testid='storyHeading'>{renderTitle()}</StoryHeading>
            <StoryDetailsDiv data-testid='storyDetailsDiv'>
                <p>{'by '}<span>{by}</span> {`${moment(new Date(time * 1000), 'YYYYMMDD').fromNow()}`}</p>
                <CommentsDiv data-testid='comment'>
                    <p style={{"paddingRight": "0.5rem"}}>{descendants}</p>
                    <ChatLeftDotsFill size={20} />
                </CommentsDiv>
            </StoryDetailsDiv>
        </StyledStory>
    )
}

export {
    StyledStory,
    StyledStorySkeleton
}

export default Story