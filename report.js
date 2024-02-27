// imports
const {crawlPage} = require('./crawl.js')

// this function converts the pages object
// into something that looks good and can be logged to the function
const printReport = (pages) => {
    console.log('----------------')
    console.log('Report')
    console.log('----------------')

    // this holds the returned sorted object
    const sortedPages = sortPages(pages)
    
}

// this function sorts the number of pages in ascending order
// the pages with the hgihgest number of links are first
const sortPages = (pages) => {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA,pageB)=> {
        return pageB[1] - pageA[1]
    })
    return pagesArr
}

module.exports = {
    printReport
}