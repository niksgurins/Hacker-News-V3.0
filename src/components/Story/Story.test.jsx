import React from 'react'
import { shallow } from 'enzyme'
import Story from './Story'
import moment from 'moment'

let defaultStory = shallow(<Story />)

describe('Story.jsx testing default values', () => {
    it('Has a score of 0', () => {   
        expect(defaultStory.find("[data-testid='upvoteDiv']").text()).toBe('0');
    })
    it('Has a title of "Default title"', () => {   
        expect(defaultStory.find("[data-testid='storyHeading']").text()).toBe("Default title");
    })
    it('Created by a user with name "Default user" on "Invalid date"', () => {   
        expect(defaultStory.find("[data-testid='storyDetailsDiv'] > p").text()).toBe("by Default user Invalid date");
    })
    it('There should be 0 comments by default', () => {   
        expect(defaultStory.find("[data-testid='comment'] p").text()).toBe("0");
    })
})

let populatedStory = shallow(<Story 
    id={192327}
    by="justin"
    time={1210981217}
    title="Justin.tv is looking for a Lead Flash Engineer!"
    url=""
    score={6}
    descendants={12} 
/>)

let expectedTime = moment(new Date(1210981217 * 1000), 'YYYYMMDD').fromNow()

describe('Story.jsx gets properly populated by properties', () => {
    it('Has a score of 6', () => {   
        expect(populatedStory.find("[data-testid='upvoteDiv']").text()).toBe('6');
    })
    it('Has a title of "Justin.tv is looking for a Lead Flash Engineer!"', () => {   
        expect(populatedStory.find("[data-testid='storyHeading']").text()).toBe("Justin.tv is looking for a Lead Flash Engineer!");
    })
    it(`Created by a user with name "justin" ${expectedTime}`, () => {   
        expect(populatedStory.find("[data-testid='storyDetailsDiv'] > p").text()).toBe(`by justin ${expectedTime}`);
    })
    it('Has 6 comments', () => {   
        expect(populatedStory.find("[data-testid='comment'] p").text()).toBe("12");
    })
})