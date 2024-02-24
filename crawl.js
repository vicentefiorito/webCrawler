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

// some testing here
const htmlBody = `<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
</body>
</html>`

console.log(getURLSFromHTML(htmlBody))

// exporting the function
module.exports = {
    normalizeURL,
    getURLSFromHTML
}