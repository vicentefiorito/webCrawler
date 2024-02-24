// this parses the command line for the website url
function main() {
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
}

main()