/*
These functions handle parsing the chord-pro text format
*/

function parseChordProFormat(chordProLinesArray) {
  //parse the song lines with embedded
  //chord pro chords and add them to DOM

  console.log('type of input: ' + typeof chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html

  for (let i = 0; i < chordProLinesArray.length; i++) {
    let line = chordProLinesArray[i]

    /* replace everything inside a square bracket, with that same thing surrounded
    by the span class tag. the $& is the regex placeholder for the "current matched string" */
    line = line.replace(/\[(.*?)\]/gs, '<span class="chord">' + '$&' + '</span>')

    console.log(line)
    textDiv.innerHTML = textDiv.innerHTML + `<p> ${line}</p>`
  }
}