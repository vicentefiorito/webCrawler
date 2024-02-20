const {test,expect} = require('@jest/globals')
const {normalizeURL} = require('./crawl.js')

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