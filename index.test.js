import JestSimpleReporter from './'

describe('onTestResult', () => {
  const test = { path: 'foo' }
  const results = {
    testFilePath: '/foo/bar/wombat',
    testResults: [{
      ancestorTitles: [ 'Flargle' ],
      failureMessages: [ 'Error: expect(jest.fn()).not.toHaveBeenCalled()\n\nExpected mock function not to be called but it was called with:\n  Array []\n    at Object.<anonymous> (/home/basie/foo/mobile/src/components/FlargleArgle/FlargleArgle.test.js:74:34)\n    at Object.asyncFn (/home/basie/foo/mobile/node_modules/jest-jasmine2/build/jasmine-async.js:68:30)\n    at resolve (/home/basie/foo/mobile/node_modules/jest-jasmine2/build/queueRunner.js:38:12)\n    at tryCallTwo (/home/basie/foo/mobile/node_modules/promise/lib/core.js:45:1)\n    at doResolve (/home/basie/foo/mobile/node_modules/promise/lib/core.js:200:9)\n    at new Promise (/home/basie/foo/mobile/node_modules/promise/lib/core.js:66:1)\n    at mapper (/home/basie/foo/mobile/node_modules/jest-jasmine2/build/queueRunner.js:31:21)\n    at Promise.resolve.then.el (/home/basie/foo/mobile/node_modules/p-map/index.js:42:16)\n    at tryCallOne (/home/basie/foo/mobile/node_modules/promise/lib/core.js:37:8)\n    at /home/basie/foo/mobile/node_modules/promise/lib/core.js:123:9' ],
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
