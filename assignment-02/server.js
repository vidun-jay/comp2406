//Server Code --USING ONLY NODE.JS BUILT IN MODULES
const http = require('http') //need to http
const fs = require('fs') //need to read static files
const url = require('url') //to parse url strings

const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
  'css': 'text/css',
  'gif': 'image/gif',
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
}

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES['txt']
}

http.createServer(function(request, response) {
  let urlObj = url.parse(request.url, true, false)
  console.log('\n============================')
  console.log("PATHNAME: " + urlObj.pathname)
  console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
  console.log("METHOD: " + request.method)

  let receivedData = ''

  //attached event handlers to collect the message data
  request.on('data', function(chunk) {
    receivedData += chunk
  })

  let dataObj = undefined //object representing the client data
  let returnObj = {} //object to be returned to client


  //event handler for the end of the message
  request.on('end', function() {
    console.log('received data: ', receivedData)
    console.log('type: ', typeof receivedData)

    //Get data from any POST request
    if (request.method == "POST") {
      //Do this for all POST messages
      dataObj = JSON.parse(receivedData)
      console.log("received data object: ", dataObj)
      console.log("type: ", typeof dataObj)
      console.log("USER REQUEST: " + dataObj.text)
      returnObj.text = "NOT FOUND: " + dataObj.text
    }


    if (request.method === "POST" && urlObj.pathname === "/userText") {
    //a POST request to fetch a puzzle
    //look for puzzle file in puzzles directory based on puzzle title
    let puzzleFile = `puzzles/${dataObj.text.trim()}.txt`
    console.log(`Looking for puzzle file: ${puzzleFile}`)
    fs.exists(puzzleFile, (exists) => {
      if(exists){
        console.log(puzzleFile + '<--EXISTS')
        //Found the puzzle file
        fs.readFile(puzzleFile, function(err, data) {
          //Read puzzle data file and send lines and chords to client
          if (err) {
            returnObj.text = "FILE READ ERROR"
            response.writeHead(200, { "Content-Type": MIME_TYPES["json"] })
            response.end(JSON.stringify(returnObj))
          } else {
            var fileLines = data.toString().split("\n")
            //get rid of any return characters
            for (i in fileLines)
              fileLines[i] = fileLines[i].replace(/(\r\n|\n|\r)/gm, "")
            returnObj.text = puzzleFile
            returnObj.puzzleLines = fileLines
            returnObj.filePath = puzzleFile
            response.writeHead(200, { "Content-Type": MIME_TYPES["json"] })
            response.end(JSON.stringify(returnObj))
          }
        })
      }
      else{
           console.log(puzzleFile + '<--DOES NOT EXIST')
           response.writeHead(200, { "Content-Type": MIME_TYPES["json"] })
           response.end(JSON.stringify(returnObj)) //send just the JSON object
      }
    })

  }

    if (request.method === "GET") {
      //handle GET requests as static file requests
      let filePath = ROOT_DIR + urlObj.pathname
      if (urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html'

      fs.readFile(filePath, function(err, data) {
        if (err) {
          //report error to console
          console.log('ERROR: ' + JSON.stringify(err))
          //respond with not found 404 to client
          response.writeHead(404)
          response.end(JSON.stringify(err))
          return
        }
        response.writeHead(200, {
          'Content-Type': get_mime(filePath)
        })
        response.end(data)
      })
    }
  })
}).listen(3000)

console.log('Server Running at http://127.0.0.1:3000  CTRL-C to quit')
console.log('To Test')
console.log('http://localhost:3000/index.html')
