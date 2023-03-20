// key code for enter
const ENTER = 13
// array to store user's attempt
let user_attempt = new Array()

function handleKeyDown(e) {}

function handleKeyUp(e) {
  if (e.which == ENTER) {
    handlePuzzleButton() //treat ENTER key like you would a submit
    document.getElementById('userTextField').value = ''
  }
}

function handlePuzzleButton() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    let userRequestObj = { text: userText }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        // we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)

        words = [] // reset words
        for (let i = 0; i < responseObj.originalLines.length; ++i) {
          for (let word of responseObj.originalLines[i].split(" "))
          words.push({word: word, x: 50, y: 50})
        } randomizeLocation()

        delete responseObj.originalLines
        console.log("data: " + JSON.stringify(responseObj))
        console.log("typeof: " + typeof this.responseText)

        drawCanvas()
      }
    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

function handleSolveButton() {
  // reset user attempt array
  user_attempt = []
  const MIN_Y = 20
  const MAX_Y = 280
  const ROW_HEIGHT = 26
  // find the number of rows that can fit between the min and max y values
  const NUM_ROWS = Math.floor((MAX_Y - MIN_Y) / ROW_HEIGHT) + 1
  // populate user attempt with empty arrays (one for each row)
  for (let i = 0; i < NUM_ROWS; ++i) user_attempt.push([])

  for (let word of words) {
    // snap every word to the nearest row
    let y = Math.min(Math.max(Math.floor((word.y + 10) / ROW_HEIGHT) * ROW_HEIGHT, MIN_Y), MAX_Y)
    word.y = y

    // find the index of the row the word belongs to
    let index = Math.floor((y + 10 - MIN_Y) / ROW_HEIGHT)

    // add the word to the array for that row
    user_attempt[index].push(word)
  }

  // sort every row by their x coordinate
  for (let row of user_attempt)
    row.sort((a, b) => a.x - b.x)

  // print user attempt to screen
  let plain_text = ""
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ''

  // assemble plaintext version of attempt
  for (let arr of user_attempt) {
    for (let word of arr)
      plain_text += word.word + " "
    if (arr.length > 0)
      plain_text += "<br>"
  }

  // check if attempt is correct
  let comparison = true
  for (let i = 0; i < words.length; ++i)
    if (user_attempt.flat()[i].word !== words[i].word) comparison = false

  // print answer
  if (comparison)
    textDiv.innerHTML += `<p style="color: green;"> ${plain_text}</p>`
    // alert("Congratulations! You solved the puzzle.")
  else
    textDiv.innerHTML += `<p style="color: red;"> ${plain_text}</p>`
    // alert("Incorrect, try again.")

  console.log(comparison);
}