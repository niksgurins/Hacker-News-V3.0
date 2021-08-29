import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { SkeletonTheme } from 'react-loading-skeleton'
import Story, {StyledStorySkeleton} from '../Story/Story'

const Pagination = styled.div`
    ul {
        color: #909198;
        display: flex;
        justify-content: center;
        align-items: baseline;
        font-size: 1.6rem;
    }

    ul li {
        margin: 1rem;
        cursor: pointer;
    }

    ul li:not(.active):hover {
        color: #FFF;
        text-decoration: underline;
    }

    ul li::marker {
        content: '';
    }

    ul li.active {
        border-bottom: 1px solid #FFF;
        color: #FFF;
    }
`

const StoryList = () => {
    const [storyIDs, setStoryIDs] = useState([])
    const [stories, setStories] = useState([])
    const [cached] = useState({})
    const [limit, setLimit] = useState(20)
    let error

    const generateStoryElement = (story, index) => {
        return <Story
            key={story.id}
            number={index+1}
            by={story.by}
            time={story.time}
            title={story.title}
            url={story.url}
            score={story.score}
            descendants={story.descendants}
        />
    }

    const fetchStory = (index) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIDs[index]}.json`)
            .then(res => res.json())
            .then(res => generateStoryElement(res, index))
            .catch(err => error = err.message)
    }

    const fetchStories = (offset) => {
        let renderedStories = []
        let max = offset + limit > storyIDs.length ? storyIDs.length : offset + limit;

        for (let i = offset; i < max; i++) { // render initial stories
            if (!cached[storyIDs[i]]) {
                cached[storyIDs[i]] = fetchStory(i)
            }
            
            renderedStories.push(cached[storyIDs[i]])
        }

        return Promise.all([...renderedStories]).then(values => setStories(values))
    }

    const fetchStoryIDs = () => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(res => res.json())
            .then(res => setStoryIDs(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!storyIDs.length)
            fetchStoryIDs()
    })

    useEffect(() => {
        if (storyIDs.length) {
            //setCached();
            fetchStories(0)
        }
    }, [storyIDs])

    const handlePageClick = (data) => {
        window.scrollTo(0,0)
        let selected = data.selected // selected page
        let offset = selected * limit
        setStories([])
        fetchStories(offset)
    };

    const renderStoryList = () => {
        if (!stories.length)
            // return <ClipLoader color={'#FFF'} loading={!stories.length} size={150} />
            return (
                <SkeletonTheme color='#2f3037' highlightColor='rgba(38,39,44,.7)'>
                    <StyledStorySkeleton count={20}/>
                </SkeletonTheme>
            )

        return (
            <>
                {stories}
            </>
        )
    }

    return (
        <div>
            {renderStoryList()}
            <Pagination>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.trunc(storyIDs.length / limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </Pagination>
        </div>
    )
}

export default StoryList