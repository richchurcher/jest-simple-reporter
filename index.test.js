import JestSimpleReporter from './'

describe('onTestResult', () => {
  const test = {}
  const results = {
    testFilePath: 'foo/bar/wombat',
    testResults: [{
      ancestorTitles: [ 'Flargle' ],
      failureMessages: [ `Error: expect(jest.fn()).not.toHaveBeenCalled()

Expected mock function not to be called but it was called with:
  Array []
    at Object.<anonymous> (${__dirname}/src/components/FlargleArgle/FlargleArgle.test.js:74:34)
    at Object.asyncFn (${__dirname}/node_modules/jest-jasmine2/build/jasmine-async.js:68:30)
    at resolve (${__dirname}/node_modules/jest-jasmine2/build/queueRunner.js:38:12)
    at tryCallTwo (${__dirname}/node_modules/promise/lib/core.js:45:1)
    at doResolve (${__dirname}/node_modules/promise/lib/core.js:200:9)
    at new Promise (${__dirname}/node_modules/promise/lib/core.js:66:1)
    at mapper (${__dirname}/node_modules/jest-jasmine2/build/queueRunner.js:31:21)
    at Promise.resolve.then.el (${__dirname}/node_modules/p-map/index.js:42:16)
    at tryCallOne (${__dirname}/node_modules/promise/lib/core.js:37:8)
    at ${__dirname}/node_modules/promise/lib/core.js:123:9` ],
      status: 'failed'
    }]
  }
  let log
  let reporter

  beforeEach(() => {
    log = jest.fn()
    global.console = { log }
    reporter = new JestSimpleReporter()
  })

  it('matches the last snapshot for a failing test', () => {
    reporter.onTestResult(test, results)
    expect(log.mock.calls[0][0]).toMatchSnapshot()
  })

  it('matches the last snapshot for a passsing test', () => {
    results.testResults = [{
      ancestorTitles: [ 'Flargle' ],
      failureMessages: [],
      status: 'passed',
      title: 'Works as expected'
    }]
    reporter.onTestResult(test, results)
    expect(log.mock.calls[0][0]).toMatchSnapshot()
  })
})
