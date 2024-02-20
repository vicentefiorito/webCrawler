const normalizeURL = (url) => {
    const path = new URL(url)
    let fullPath = `${path.host}${path.pathname}`
    // if the url is not empty and last element of the url is a '/' just delete it
    if(fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

// testing here
const url1 = normalizeURL('https://blog.boot.dev/path/')
console.log(url1)

// exporting the function
module.exports = {
    normalizeURL
}