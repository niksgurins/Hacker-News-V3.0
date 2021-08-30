import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import StoryList from './StoryList'
import Story, { StyledStorySkeleton } from '../Story/Story'

describe('StoryList.jsx testing', () => {
    let storyList;

    beforeEach(() => {
        storyList = shallow(<StoryList />)
    })

    // it('Renders the right amount story skeletons before the stories are rendered', () => {
    //     expect(storyList.find('.react-loading-skeleton')).toHaveLength(20);
    // })

    // it('Renders 20 stories after about 2 seconds', async () => {
    //     const promise = () => {
    //         return new Promise(resolve => {
    //             setTimeout(() => {
    //                 storyList.update();
    //                 resolve(storyList);
    //             }, 4500);
    //         });
    //     };

    //     return promise().then(res => {
    //         expect(storyList.find(Story)).toHaveLength(20);
    //     })    
    // })
})