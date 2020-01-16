const http = require('http')
// Templating
const ejs = require('ejs')
const { join } = require('path')
// Post request handling
const qs = require('querystring')
// Wintr module
const { Wintr } = require('../src/wintr')

const processPost = (req, res) => new Promise((resolve, reject) => {
  // Gather POST data
  let body = ''
  req.on('data', function (data) {
    body += data
    // Too much POST data (~1M), kill the connection!
    if (body.length > 1e6) { req.connection.destroy() }
  })

  // Call Wintr and return result
  req.on('end', function () {
    const post = qs.parse(body)

    const w = new Wintr(post)
    return w.fetch()
      .then(resolve)
      .catch(reject)
  })
})

const processGetAccountData = (apikey) => {
  const w = new Wintr({ apikey })
  return w.getAccountInfo()
}

const renderTemplate = (res, data = {}) => {
  ejs.renderFile(join(__dirname, '/main.ejs'), data, function (err, html) {
    res.writeHead(err ? 400 : 200, { 'Content-Type': 'text/html' })
    res.write(html || 'Error rendering ejs')
    res.end()
  })
}

const handleProcessError = (res, error) => {
  console.error(error)
  return renderTemplate(res, { error })
}

// Actual server code
const server = http.createServer(function (req, res) {
  // Fetch route
  if (req.method === 'POST' && req.url === '/post') {
    return processPost(req, res)
      .then(data => {
        return renderTemplate(res, { result: data })
      })
      .catch(error => handleProcessError(res, error))
  } else if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost:8080')

    // GetAccountData route
    // ex: /getAccountData?apikey=abc
    if (url.pathname === '/getAccountData') {
      if (!url.searchParams.has('apikey') || !url.searchParams.get('apikey')) {
        handleProcessError(res, 'Missing apikey param')
      }

      return processGetAccountData(url.searchParams.get('apikey'))
        .then(data => {
          return renderTemplate(res, { result: data })
        })
        .catch(error => handleProcessError(res, error))
    } else {
      // Every other thing
      return renderTemplate(res)
    }
  }
})
server.listen(8080)
