//KEY CODES
//should clean up these hard-coded key codes
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40


function handleKeyDown(e) {

  //console.log("keydown code = " + e.which)

  let dXY = 5; //amount to move in both X and Y direction
  if (e.which == UP_ARROW && movingBox.y >= dXY)
    movingBox.y -= dXY //up arrow
  if (e.which == RIGHT_ARROW && movingBox.x + movingBox.width + dXY <= canvas.width)
    movingBox.x += dXY //right arrow
  if (e.which == LEFT_ARROW && movingBox.x >= dXY)
    movingBox.x -= dXY //left arrow
  if (e.which == DOWN_ARROW && movingBox.y + movingBox.height + dXY <= canvas.height)
    movingBox.y += dXY //down arrow

  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }

}

function handleKeyUp(e) {
  //  console.log("key UP: " + e.which)
  if (e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW) {
    let dataObj = {
      x: movingBox.x,
      y: movingBox.y
    }
    //create a JSON string representation of the data object
    let jsonString = JSON.stringify(dataObj)
    //DO NOTHING WITH THIS DATA FOR NOW


  }
  if (e.which == ENTER) {
    handleSubmitButton() //treat ENTER key like you would a submit
    document.getElementById('userTextField').value = ''

  }

  e.stopPropagation()
  e.preventDefault()

}


function handleSubmitButton() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = textDiv.innerHTML + `<p> ${userText}</p>`

    let userRequestObj = { text: userText }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("data: " + this.responseText)
        console.log("typeof: " + typeof this.responseText)
        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        movingString.word = responseObj.text

        // set found or unfound for moving word
        if (responseObj.text.includes("NOT FOUND")) {
          words = []
          movingString.word = "NOT FOUND: " + userText
        } else movingString.word = "FOUND"

        words = [] // reset words
        for (let i = 0; i < responseObj.songLines.length; i++) {
          for (let word of responseObj.songLines[i].split(" "))
            words.push({word: word, x: 50, y: 50})
          } randomizeLocation()
        drawCanvas()
      }
    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

function handleSubmitButtonWithFetch() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = textDiv.innerHTML + `<p> ${userText}</p>`

    let userRequestObj = { text: userText }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    fetch('/userText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRequestObj),
    })
    .then((response) => response.json())
    .then((userRequestObj) => {
        console.log('Success:', userRequestObj)

        // set found or unfound for moving word
        if (userRequestObj.text.includes("NOT FOUND")) {
          words = []
          movingString.word = "NOT FOUND: " + userText
        } else movingString.word = "FOUND"

        //process the data how you want
        words = [] // reset words
        for (let i = 0; i < userRequestObj.songLines.length; i++) {
          for (let word of userRequestObj.songLines[i].split(" "))
            words.push({word: word, x: 50, y: 50})
          } randomizeLocation()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
  }
}