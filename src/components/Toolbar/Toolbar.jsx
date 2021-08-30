import React, { useRef } from 'react'
import styled from 'styled-components'
import { ThreeDots, Search } from 'react-bootstrap-icons'

// Icon sourced from https://www.cleanpng.com/png-computer-icons-hacker-news-icon-hacker-1303616/download-png.html
import icon from '../../static/icon.png'

const StyledToolbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: #202226;
    border-bottom: 1px solid #909198; 

    img {
        height: 6.4rem;
        width: 6.4rem;
        margin-right: 1.6rem;
        cursor: pointer;
        z-index: 999;

        &:hover ~ #imgBg {
            background-color: #FFF;
        }
    }

    #imgBg {
        z-index: 998;
        position: absolute;
        top: .8rem;
        left: .8rem;
        width: 4.8rem;
        height: 4.8rem;
        background-color: #202226;
        transition: background-color .15s ease-in;
    }

    button {
        color: #909198;
        background: none;
        border: none;
        margin: 0 1rem;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        transition: all .15s ease-in;

        &:not(.active):hover {
            color: #FFF;
            text-decoration: underline;
        }
    }

    .active { 
        color: #FFF;
        border-bottom: 1px solid #FFF; 
    }
`

const LimitSearchDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    input {
        height: 3rem;
        width: 0;
        background-color: #2f3037;
        border: none;
        border-radius: 1.5rem;
        padding-left: 1.5rem;
        padding-right: 3.6rem;
        margin-right: 6rem;
        opacity: 0;
        transition: width .15s ease-in;
        color: #FFF;

        &:focus {
            outline: none;
        }

        @media (max-width: 1007px) {
            max-width: 20rem;
        }
    }

    svg {
        color: #909198;
        margin: 0 1.1rem;
        cursor: pointer;
        position: absolute;
        top: .5rem;
        transition: color .15s ease-in;
        height: 2rem;
        width: 2rem;

        &:hover {
            color: #FFF;
        }
    }

    svg:first-of-type {
        right: 6rem;
    }

    svg:last-of-type {
        z-index: 997;
        right: 1rem;
    }

    #dropdownBg { 
        display: none;
        z-index: 996;
        position: relative;
        height: 4rem;
        width: 4rem;
        border-top: 1px solid #909198;
        border-left: 1px solid #909198;
        border-right: 1px solid #909198;
        border-radius: 2rem 2rem 0 0;
        margin-right: 1rem;
        opacity: 0;
        transition: opacity .5s ease-in;

        &::after {
            position: absolute;
            left: -.1rem;
            bottom: -1.2rem;
            content: '';
            border-left: 1px solid #909198;
            border-right: 1px solid #909198;
            height: 1.3rem;
            width: 4rem;
            background-color: #202226;
        }
    }
`

// Inspired by https://dribbble.com/shots/11136213-Profile-Dropdown
const DropdownLimitsList = styled.ul`
    position: absolute;
    background-color: #202226;
    height: 0;
    width: max-content;
    display: none;
    top: 130%;
    right: 0;
    font-size: 1.6rem;
    color: #909198;
    border-left: 1px solid #909198;
    border-right: 1px solid #909198;
    border-bottom: 1px solid #909198;
    opacity: 0;
    transition: opacity .5s ease-in;

    li {
        text-align: center;
        margin: 0.5rem 1rem;
        font-weight: 600;

        &:not(.active):not(:first-of-type):hover {
            cursor: pointer;
            color: #FFF;
            text-decoration: underline;
        }

        &:first-of-type {
            font-size: 1.3rem;
            font-weight: 300;
        }

        &::marker {
            content: '';
        }
    }

    li.active {
        border: none;
        text-decoration: underline;
    }

    hr {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        border: none;
        height: 1px;
        background-color: #909198;
    }
`

const Toolbar = ({ category, setCategory, setStoryIDs, setStories, limit, setLimit }) => {
    const searchBar = useRef()
    const searchIcon = useRef()
    const dropdownIcon = useRef()
    const dropdownList = useRef()
    const dropdownBg = useRef()

    const handleCategoryClick = (cat) => {
        if (category !== cat) {
            setStories([])
            setStoryIDs([])
            setCategory(cat)
        }
    }

    const handleSearchIconClick = () => {
        if (searchBar.current.style.width) {
            searchBar.current.style.width = ''
            searchBar.current.style.opacity = 0
            searchIcon.current.style.color = '#909198'
        } else {
            searchBar.current.style.width = '30rem'
            searchBar.current.style.opacity = 1
            searchIcon.current.style.color = '#FFF'
        }
    }

    const handleDropdownClick = () => {
        if (dropdownList.current.style.height) {
            dropdownList.current.style.height = ''
            dropdownList.current.style.display = 'none'
            dropdownIcon.current.style.color = '#909198'
            searchIcon.current.style.top = '.45rem'
            dropdownIcon.current.style.top = '.45rem'
            dropdownBg.current.style.display = 'none'
            dropdownList.current.style.opacity = 0
            dropdownBg.current.style.opacity = 0
            searchBar.current.style.marginRight = '6rem'
        } else {
            dropdownList.current.style.height = 'auto'
            dropdownList.current.style.display = 'block'
            dropdownIcon.current.style.color = '#FFF'
            searchIcon.current.style.top = '1rem'
            dropdownIcon.current.style.top = '1rem'
            dropdownBg.current.style.display = 'block'
            dropdownList.current.style.opacity = 1
            dropdownBg.current.style.opacity = 1
            searchBar.current.style.marginRight = '0.8rem'
        }
    }

    const handleLimitClick = (lim) => {
        if (limit !== lim) {
            setStories([])
            setLimit(lim)
            handleDropdownClick()
        }
    }
 
    return (
        <StyledToolbar>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={icon} onClick={() => handleCategoryClick('top') } />
                <div id='imgBg'></div>
                <button className={category === 'new' ? 'active' : ''} onClick={() => handleCategoryClick('new') }>New</button>
                <button className={category === 'top' ? 'active' : ''} onClick={() => handleCategoryClick('top') }>Top</button>
                <button className={category === 'best' ? 'active' : ''} onClick={() => handleCategoryClick('best') }>Best</button>
                <button className={category === 'ask' ? 'active' : ''} onClick={() => handleCategoryClick('ask') }>Ask</button>
                <button className={category === 'show' ? 'active' : ''} onClick={() => handleCategoryClick('show') }>Show</button>
                <button className={category === 'job' ? 'active' : ''} onClick={() => handleCategoryClick('job') }>Job</button>
            </div>
            <LimitSearchDiv>
                <input ref={searchBar} type='text' placeholder='Search stories...'></input>
                <Search ref={searchIcon} size={20} onClick={handleSearchIconClick} />
                <ThreeDots ref={dropdownIcon} size={20} onClick={handleDropdownClick} />
                <div ref={dropdownBg} id='dropdownBg'></div>
                <DropdownLimitsList ref={dropdownList}>
                    <li>Stories per page</li>
                    <hr />
                    <li className={limit === 10 ? 'active' : ''} onClick={() => handleLimitClick(10)}>10</li>
                    <li className={limit === 20 ? 'active' : ''} onClick={() => handleLimitClick(20)}>20</li>
                    <li className={limit === 50 ? 'active' : ''} onClick={() => handleLimitClick(50)}>50</li>
                </DropdownLimitsList>
            </LimitSearchDiv>
        </StyledToolbar>
    )
}

export default Toolbar