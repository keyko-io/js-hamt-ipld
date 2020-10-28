var fs = require('fs')
var path = require('path')
const { parseIssue } = require('./notary-issue-parser')

describe('parseIssue()', () => {
  it('we can parse an issue including the right data', () => {
    const issueContent = fs.readFileSync(
      path.resolve(__dirname, '../samples/utils/notary_application.test.md'),
      { encoding: 'utf8' },
    )
    const parsedResult = parseIssue(issueContent)

    console.log(parsedResult)

    expect(parsedResult.correct).toBe(true)
    expect(parsedResult.name).toBe('Notary A')
    expect(parsedResult.address).toBe('f1111222333')
    expect(parsedResult.datacapRequested).toBe('10TB')
    expect(parsedResult.website).toBe('info.org')
    expect(parsedResult.region).toBe('[North America]')
    expect(parsedResult.useCases).toBe('[Developer Tools, Web 3.0]')

  })

  it('we can not parse an invalid issue', () => {
    const parsedResult = parseIssue('random string')
    expect(parsedResult.correct).toBe(false)
    expect(parsedResult.errorMessage).not.toBe('')
  })
})