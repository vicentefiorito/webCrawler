const {test,expect} = require('@jest/globals')
const {normalizeURL, getURLSFromHTML} = require('./crawl.js')

// test cases
test('slash test',() => {
    const url = 'https://blog.boot.dev/path/'
    const newURL = normalizeURL(url)
    const expectedURL = 'blog.boot.dev/path'
    expect(newURL).toEqual(expectedURL)
})

test('protocol test',() => {
    const url = 'https://blog.boot.dev/path'
    const newURL = normalizeURL(url)
    const expectedURL = 'blog.boot.dev/path'
    expect(newURL).toEqual(expectedURL)
})

test('CAPITAL test', () => {
    const url = 'https://BLOG.boot.dev/path'
    const newURL = normalizeURL(url)
    const expectedURL = 'blog.boot.dev/path'
    expect(newURL).toEqual(expectedURL)
})

test('http protocol test',() => {
    const url = 'http://BLOG.boot.dev/path'
    const newURL = normalizeURL(url)
    const expectedURL = 'blog.boot.dev/path'
    expect(newURL).toEqual(expectedURL)
})

test('Absolute URL',() => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody =  '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actualURLS = getURLSFromHTML(inputBody,inputURL)
    const expectedURLS = ['https://blog.boot.dev/']
    expect(actualURLS).toEqual(expectedURLS)
})

test('Relative URL',() => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody =  '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actualURLS = getURLSFromHTML(inputBody,inputURL)
    const expectedURLS = ['https://blog.boot.dev/path/one']
    expect(actualURLS).toEqual(expectedURLS)
})

test('Multiple URLS in body',() => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody =  '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actualURLS = getURLSFromHTML(inputBody,inputURL)
    const expectedURLS = ['https://blog.boot.dev/path/one', 'https://other.com/path/one']
    expect(actualURLS).toEqual(expectedURLS)
})

test('No URL founded',() => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody =  '<html><body><span>No href here!></span></body></html>'
    const actualURLS = getURLSFromHTML(inputBody,inputURL)
    const expectedURLS = []
    expect(actualURLS).toEqual(expectedURLS)
})