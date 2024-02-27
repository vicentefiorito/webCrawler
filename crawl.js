// imports 
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const normalizeURL = (url) => {
    const path = new URL(url)
    let fullPath = `${path.host}${path.pathname}`
    // if the url is not empty and last element of the url is a '/' just delete it
    if(fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

// function that gets the links to a webpage from markdown
const getURLSFromHTML = (htmlBody,baseURL) => {
    // this is going to store all the urls found in the body
    const urls = []
    // initializes the object model to the htmlBody parameter
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.body.querySelectorAll('a') //this returns an array of all the 'a' tag elements
    // loops throught all the 'a' elements found within the body
    for(aElement of aElements){
        try {
            const path = aElement.getAttribute('href')
            const url = new URL(path,baseURL)
            urls.push(url.href)
        } catch(err) {
            console.log(`${err.message}: ${aElement.href}`)
            continue
        }
    }
    return urls
}

// this function crawls the page starting from the base url
async function crawlPage(baseURL,currentURL,pages) {
    // if the currentURL and the baseURL are not in the same domain, just return
    const currentURLObj = new URL(currentURL)
    const baseURLObj = new URL(baseURL)
    if(currentURLObj.hostname != baseURLObj.hostname) {
        return pages
    }

    // gets a normalized version of the currentURL
    const normalizedURL = normalizeURL(currentURL)

    // if we've already visited the normalizedURL
    // increment the count and return the pages
    if(pages[normalizedURL] > 0){
        pages[normalizedURL]++
        return pages
    }

    // if the normalizedURL does not exits in the pages object
    // create it and set it to 1 if its not the base url
    // otherwise set the count to 0
    if(currentURL === baseURL ) {
        pages[currentURL] = 0
    } else {
        pages[currentURL] = 1
    }

    // performing the crawl
    console.log(`Starting crawl from: ${currentURL}`)
    // this variable will hold the html strint
    let htmlBody = ''
    try{
        const res = await fetch(currentURL, {
            method: 'GET',
            mode:'cors',
        })
        // if the status code is an error-level code, print an error and return
        if(res.status > 399) {
            console.log('Error Status, cannot run!')
            return
        }
        const contentType = res.headers.get('content-type')
        // if the 'content-type' is not 'text/html' print an error and return
        if(!contentType.includes('text/html')) {
            console.log('Wrong content-type header, cannor run!')
            return 
        }
        // now changed to represent the string in the page
        htmlBody = await res.text()

    } catch(err) {
        console.log(`${err.message}`)
    }
    // gets all the urls from a single webpage
    const urls = getURLSFromHTML(htmlBody,baseURL)
    for(const url of urls) {
        pages = await crawlPage(baseURL,url,pages)
    }
    return pages
}

// some testing here
const baseUrl = 'https://wagslane.dev'
crawlPage(baseUrl,baseUrl,{})

// exporting the function
module.exports = {
    normalizeURL,
    getURLSFromHTML,
    crawlPage
}