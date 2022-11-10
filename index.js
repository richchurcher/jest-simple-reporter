const path = require('path');

class JestSimpleReporter {
  constructor (globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
    this._first = true
  }

  onTestResult (test, { testFilePath, testResults }) {
    testResults.forEach(result => {
      const { ancestorTitles, failureMessages, status, title } = result
      const firstNewline = this._first ? '\n' : ''
      let translatedStatus = 'I'

      switch (status) {
        case 'failed':
          translatedStatus = 'E'
          failureMessages.forEach(m => {
            const traceIdx = m.indexOf('    at')
            if (traceIdx) {
              const message = m
                .substring(0, traceIdx)
                .split('\n\n')[1]
                .replace(/\r?\n|\r/g, ' ')
                .replace(/\s+/g, ' ')
              const trace = m
                .substring(traceIdx)
                .split('\n')[0]
              const loc = trace.substring(
                trace.indexOf('(') + 1,
                trace.indexOf(')') - 1
              ).split(':')

              console.log(`${firstNewline}${path.relative('./', loc[0])}:${loc.slice(-2).join(':')}:${translatedStatus}:${message}`)
            }
          })
          break

        case 'passed':
          console.log(`${firstNewline}${path.relative('./', testFilePath)}:::${translatedStatus}:${ancestorTitles.join(' > ')}:${title}`)
          break
      }
      if (this._first) this._first = false
    })
  }
}

module.exports = JestSimpleReporter
