import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { SkeletonTheme } from 'react-loading-skeleton'

import Story, {StyledStorySkeleton} from '../Story/Story'
import Toolbar from '../Toolbar/Toolbar'
import { fetchStory, fetchStoryIDs } from '../../http/client'

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
        transition: all .15s ease-in;

        &:not(.active):hover {
            color: #FFF;
            text-decoration: underline;
        }

        &::marker {
            content: '';
        }
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
    const [category, setCategory] = useState('top')
    const [page, setPage] = useState(0)

    const generateStoryElement = (story) => {
        return <Story
            key={story.id}
            number={story.number + 1}
            by={story.by}
            time={story.time}
            title={story.title}
            url={story.url}
            score={story.score}
            descendants={story.descendants}
        />
    }

    const wrapFetchStory = (id, index) => {
        return fetchStory(id)
            .then(res => { 
                let story = { ...res }
                story.number = index
                return story
            })
    }

    const fetchStories = (offset) => {
        let fetchedStories = []
        let max = offset + limit > storyIDs.length ? storyIDs.length : offset + limit;

        for (let i = offset; i < max; i++) { // render initial stories
            if (!cached[storyIDs[i]]) {
                cached[storyIDs[i]] = wrapFetchStory(storyIDs[i], i)
            } else {
                cached[storyIDs[i]]['number'] = i
            }

            fetchedStories.push(cached[storyIDs[i]])
        }

        return Promise.all([...fetchedStories]).then(values => { 
            setStories(values.map(story => generateStoryElement(story)))
        })
    }

    useEffect(() => {
        if (!storyIDs.length) {
            setPage(0)
            fetchStoryIDs(category)
                .then(res => setStoryIDs(res))
        }
    })

    useEffect(() => {
        if (storyIDs.length) {
            fetchStories(0)
        }
    }, [storyIDs, limit])

    const handlePageClick = (data) => {
        window.scrollTo(0,0)
        let selected = data.selected // selected page
        setPage(selected)
        let offset = selected * limit
        setStories([]) // clear previously displayed stories
        fetchStories(offset)
    }

    const renderStoryList = () => {
        if (!stories.length) { // Show story frame skeletons while fetching stories
            return (
                <SkeletonTheme color='#2f3037' highlightColor='rgba(38,39,44,.7)'>
                    <StyledStorySkeleton count={limit}/>
                </SkeletonTheme>
            )
        }

        return (
            <>
                {stories}
                <Pagination>
                    <ReactPaginate
                        forcePage={page}
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(storyIDs.length / limit)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </Pagination>
            </>
        )
    }

    return (
        <div>
            <Toolbar category={category} setCategory={setCategory} setStoryIDs={setStoryIDs} setStories={setStories} limit={limit} setLimit={setLimit} />
            {renderStoryList()}
        </div>
    )
}

export default StoryList