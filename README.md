# Hacker News V3.0
This application is basically just a reskin of Y Combinator's Hacker News(or HN) using the HackerNewsAPI (created for a technical assessment). Only the home page has been designed due to the time constraint of the technical assessment.
I decided to create a dark-themed look for HN.

## How to run
### Prerequisites
To run the application you're going to need node installed. You can find node [here](https://nodejs.org/en/).
### Installation
1. Clone the repository from your command line or download the repo zip file and extract it. 
2. Change directory to this repository's folder and execute npm install or npm i. This will start installing the necessary packages.
3. Once the packages are installed, run the command npm run start (to run the included tests, use command npm run test). 
4. The application should launch automatically in a new browser tab. If it doesn't though, open up a new tab and go to http://localhost:3000/

## Design decisions
When thinking about how I would redesign HN, I thought about a few things. The original site was created before dark themes were even a thing and I wanted to see what it would look like using one. I took inspiration from Discord's color palette.
HN in my opinion was over abundant with text, that had not enough spacing in between. I tried to make each news story more readable, and cut away some of the unnecessary fat. This included: 
* The url after the title on the original site is now a part of the title itself
* I got rid of the word "comments" and made an icon to represent what the number on the right side meant
* I took inspiration from [reddit's](https://www.reddit.com/) up vote/down vote design and implemented something similar to represent score

In terms of the functionality, the API was a difficult one to work with, as it has very limited functionality. As such, I wanted to create the app as fast as possible. On initial load, I fetch all storyIDs for top stories, then create requests for 20(the defualt stories per page limit) of the top stories and add them to a state object called cached. Before creating a request for story details, I check the cached object to see if I've already fetched the story before, and if it's details are there, I just return the value from cache. This makes loading previously visited pages almost instant and reduces calls to HN's firebase.

The cached object looks like a map, with story IDs as property names and story details as their values:

`cache = {
    123: {
        title: 'Story Title',
        by: 'john',
        ...
    },
    234 : { ... },
    ...
}`

## Assumptions made
Given the assessment specification and the included time constraint, I thought it best to use libraries to achieve certain functionality. I am also of the opinion that, in general, libraries should be used because they've been tried and tested by the community and in order to avoid reinventing the wheel.

As such, I used the following libraries:
* react-paginate to handle a large chunk of my pagination needs
* react-loading-skeleton to serve as my loading state
* moment to handle date/time manipulation

I also assumed that time spent reading is not time spent coding/designing and I didn't include time spent on research/learning for this projectas into the maximum time allowed.

## Improvements I would make with more time
### Code wise
The StoryList component slowly but surely became a god-component, which included everything pertaining to the HomePage. As such HomePage is just a div with <StoryList /> inside of it. I would bring out the state variables from StoryList into home, and have HomePage orchestrate the functionality between components. Let the components be responsible for their unique functinoality.
### Functionality
I would:
* Actually implement functionality behind the comment/user buttons
* Figure out an efficient way to include the search ability
* Fix an issue with caching that makes previously cached stories display their previous order number (e.g. if I see a story on top stories at position 12 and it's cached, and then I go to best stories and it's in position 1, the number displayed will be 12 😔)
* Implement some sort of a router to give the user the ability to press back in the browser and be taken to the correct previous page, whatever it was
### Testing
I would:
* Do more research on Jest + Enzyme and how to efficiently write test cases
* Make sure a screen-reader can traverse the app properly
* Swap from react-scripts' version of Jest and just use plain Jest + Enzyme. I ran into some costly problems trying to use react-scripts' limited version of Jest, particularly with being unable to use `.not` to make assertions
* Increase test coverage and use something like Sinon.JS to test if my http requests are working as intended
### Design
I would:
* Fix the issues related to currently supported screen widths (below 640px, below 1007px and above 1007px)
* Include support for more screen widths
* Improve the dropdown for page story limits with a border-radius and animations