const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')

// this parses the command line for the website url
async function main() {
    // if number of arguments is less than 1, print error and exit
    if(process.argv.length < 3){
        console.log('error, starting URL not provided!')
        return 
    }

    // if number of arguments is greater than 1, pring error and exit
    if(process.argv.length > 3) {
        console.log('error, too many arguments to run!')
        return
    }
    
    // the baseUrl given to the command line is the starting point for the url
    const startUrl = process.argv[2]
    console.log(`Starting the app at: ${startUrl}`)

    // awaiting the result of the page
    const pages = await crawlPage(startUrl,startUrl,{})
    // prints the report in a nice way
    printReport(pages)
}


main()