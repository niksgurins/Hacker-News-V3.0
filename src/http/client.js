const categoryURLs = {
    new: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    top: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    best: 'https://hacker-news.firebaseio.com/v0/beststories.json',
    ask: 'https://hacker-news.firebaseio.com/v0/askstories.json',
    show: 'https://hacker-news.firebaseio.com/v0/showstories.json',
    job: 'https://hacker-news.firebaseio.com/v0/jobstories.json'
}

const basicGet = (url) => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}

const fetchStoryIDs = (category) => {
    return basicGet(categoryURLs[category])
}

const fetchStory = (id) => {
    return basicGet(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
}

export {
    fetchStoryIDs,
    fetchStory
}