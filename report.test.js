const {test,expect} = require('@jest/globals')
const {sortPages} = require('./report.js')

// test cases
test('sort pages valid case',() => {
    const input = {
        url1: 5,
        url2: 30,
        url3: 1,
        url4: 100
    }

    const actual = sortPages(input)
    const expected = [
        ['url4',100],
        ['url2',30],
        ['url1',5],
        ['url3',1]
    ]
    expect(actual).toEqual(expected)
})

test('sort pages null case',() => {
    const input = {}
    const actual = sortPages(input)
    const expected = []
    expect(actual).toEqual(expected)
})
