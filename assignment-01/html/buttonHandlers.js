//KEY CODES
//should clean up these hard coded key codes
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40

var count = 0
const notes = ['A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab']

function handleKeyDown(e) {

  //console.log("keydown code = " + e.which );
  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }
}

function handleKeyUp(e) {
  //console.log("key UP: " + e.which);
  if (e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW) {
    //do nothing for now
  }

  if (e.which == ENTER) {
    handleSubmitButton() //treat ENTER key like you would a submit

    document.getElementById('userTextField').value = ''
  }

  e.stopPropagation()
  e.preventDefault()

}

function handleSubmitButton(input_userText) {
  //USES older-style XMLHttpRequest which we will replacde later with fetch()
  //get text from user text input field

  let userText = document.getElementById('userTextField').value
  window.search = userText
  //clear lines of text in chords
  let chords = document.getElementById("text-area")
  chords.innerHTML = ''

  if (userText && userText !== '') {
    window.count = 0

    let userRequestObj = { text: userText }

    let userRequestJSON = JSON.stringify(userRequestObj)
    //clear the user text field
    document.getElementById('userTextField').value = ''

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log("typeof: " + typeof this.responseText)
       console.log("data: " + this.responseText)
       // we are expecting the response text to be a JSON string
       let responseObj = JSON.parse(this.responseText)

        segments = [] //clear drag-able segments array;
        if (responseObj.songLines) {
          song.songLines = responseObj.songLines
          transposedByNSemitones = 0 // reset transpose to no-transpose
          parseChordProFormat(song.songLines)
        }
      }
    }
    xhttp.open("POST", "song") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

function handleTransposeUp() {
  // get all elements with chord class
  let chords = document.querySelectorAll('.chord')

  this.count = (this.count+1) % 17

  // check if count is 0, if it is reset to green
  if (this.count == 0)
    for (let chord of chords) chord.style.color = 'green';
  // otherwise change it to red
  else
    for (let chord of chords) chord.style.color = 'red';

  let transposed_line = ""

  // iterate through chords array
  for(let i = 0; i < chords.length; i++) {
    // split into array of characters
    let segments = chords[i].textContent.split("")
    console.log(segments);

    // loop through array of characters
    for(let j = 0; j < segments.length; j++) {

      // calculate the proper index
      let transposed_index = notes.findIndex(note => note === segments[j])
      // if the note isn't found, return -1
      transposed_index = (transposed_index !== -1) ? (transposed_index + 1) % 17 : -1

      // if the index is -1 (note not found) then add the trailing part
      if(transposed_index == -1) transposed_line += segments[j]

      else if (segments[j+1] == "#" || segments[j+1] == "b") {

        transposed_index = notes.findIndex(note => note === `${segments[j]}${segments[j+1]}`)
        transposed_index = (transposed_index + 1) % 17

        // check if lenth of the note is 1 or 2 (contains a "#/b" or doesn't)
        if (notes[transposed_index].length == 2) {
          transposed_line += notes[transposed_index]
          j++
        } else {
          transposed_line += notes[transposed_index]
          // fix spacing issue
          if(segments[j+2] == " ") transposed_line += " "
          j++
        }

      // case for when note is a single-lengthed chord
      } else if(notes[transposed_index].length == 2) {
        transposed_line += notes[transposed_index]

        // add a space when a single chord is converted to a 2 length chord
        if(segments[j+1] == " " && segments[j+2] == " ") j++

      } else transposed_line += notes[transposed_index]

    }
    chords[i].textContent = transposed_line
    transposed_line = "" // reset transposed line
  }
}

function handleTransposeDown() {
  // get all elements with chord class
  let chords = document.querySelectorAll('.chord')

  this.count = (this.count-1) % 17

  // check if count is 0, if it is reset to green
  if (this.count == 0)
    for (let chord of chords) chord.style.color = 'green';
  // otherwise change it to red
  else
    for (let chord of chords) chord.style.color = 'red';

  let transposed_line = ""

  // iterate through chords array
  for(let i = 0; i < chords.length; i++) {
    // split into array of characters
    let segments = chords[i].textContent.split("")

    // loop through array of characters
    for(let j = 0; j < segments.length; j++) {
      // calculate the proper index
      let transposed_index = notes.findIndex(note => note === segments[j])
      // if the note isn't found, return -1
      transposed_index = (transposed_index !== -1) ? (transposed_index + 16) % 17 : -1

      // if the index is -1 (note not found) then add the trailing part
      if(transposed_index == -1) transposed_line += segments[j]

      else if (segments[j+1] == "#" || segments[j+1] == "b") {
        transposed_index = notes.findIndex(note => note === `${segments[j]}${segments[j+1]}`)
        transposed_index = (transposed_index + 16) % 17

        // check if lenth of the note is 1 or 2 (contains a "#/b" or doesn't)
        if (notes[transposed_index].length == 2) {
          transposed_line += notes[transposed_index]
          j++
        } else {
          transposed_line += notes[transposed_index]
          // fix spacing issue
          if(segments[j+2] == " ") transposed_line += " "
          j++
        }

      // case for when note is a single-lengthed chord
      } else if(notes[transposed_index].length == 2) {
        transposed_line += notes[transposed_index]

        // add a space when a single chord is converted to a 2 length chord
        if(segments[j+1] == " " && segments[j+2] == " ") j++

      } else transposed_line += notes[transposed_index]
    }
    chords[i].textContent = transposed_line
    transposed_line = "" // reset transposed line
  }
}