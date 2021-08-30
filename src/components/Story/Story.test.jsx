import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import Story from './Story'

describe('Story.jsx testing default values', () => {
    let defaultStory;

    beforeEach(() => {
        defaultStory = shallow(<Story />)
    })

    it('Has a number (its order in the list) of 0 by default', () => {
        expect(defaultStory.find("[data-testid='storyNumber']").text()).toBe('0');
    })
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


describe('Story.jsx gets properly populated by properties', () => {
    const expectedTime = moment(new Date(1210981217 * 1000), 'YYYYMMDD').fromNow()
    let populatedStory;

    beforeEach(() => {
        populatedStory = shallow(<Story 
            number={10}
            by="justin"
            time={1210981217}
            title="Justin.tv is looking for a Lead Flash Engineer!"
            url=""
            score={6}
            descendants={12} 
        />)
    })

    it('Has a number of 10', () => {
        expect(populatedStory.find("[data-testid='storyNumber']").text()).toBe('10');
    })
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
    it('Title should not be a link as empty url passed', () => {
        expect(populatedStory.find("[data-testid='storyHeading'] > a")).toHaveLength(0);
    })
})



describe('Story.jsx has clickable title when url passed', () => {
    let populatedStoryWithLink;

    beforeEach(() => {
        populatedStoryWithLink = shallow(<Story 
            number={10}
            by="justin"
            time={1210981217}
            title="Justin.tv is looking for a Lead Flash Engineer!"
            url="https://justin.tv"
            score={6}
            descendants={12} 
        />)
    })

    it('Has a link', () => {
        expect(populatedStoryWithLink.find("[data-testid='storyHeading'] > a").prop("href")).toBe("https://justin.tv");
    })
})