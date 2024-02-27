
// this function converts the pages object
// into something that looks good and can be logged to the function
const printReport = (pages) => {
    console.log('----------------')
    console.log('Report')
    console.log('----------------')

    // this holds the returned sorted object
    const sortedPages = sortPages(pages)
    for(const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const count = sortedPage[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
    
}

// this function sorts the number of pages in ascending order
// the pages with the hgihgest number of links are first
const sortPages = (pages) => {
    // converts the pages object into a 2D array where each inner array is [link,count]
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA,pageB)=> {
        return pageB[1] - pageA[1]
    })
    return pagesArr
}

module.exports = {
    printReport,
    sortPages
}