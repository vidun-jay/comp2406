/*
These functions handle parsing the chord-pro text format
*/

/**
 * Extracts the chords from a given string into an array
 * @param str String to parse chords from
 * @returns Array of chords
 */
function extractChords(str) {
    // return an array of all the string elements in the form "[x]" using regex
    return str.match(/\[(.*?)\]/gs)
}

function parseChordProFormat(chordProLinesArray) {
    //parse the song lines with embedded
    //chord pro chords and add them to DOM

    console.log('type of input: ' + typeof chordProLinesArray)

    //add the lines of text to html <p> elements
    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = '' //clear the html

    for (let line of chordProLinesArray) {
        // final concatonated string
        let results = ""
        // array of just the chords of each line
        let chords = extractChords(line)
        // counter for how many chords have been printed already
        let j = 0

        let top_line = ""
        let bottom_line = ""

        /* anytime you see [x] using regex, replace it with a "|"
        this will be our delimiter */
        let new_line = line.replace(/\[(.*?)\]/gs, "|")

        // go through each character in current line
        for (let i = 0; i < new_line.length; i++) {
            // if it's the "|" character, add the chord to the line above
            if (new_line[i] == "|") {
                top_line += chords[j].replace("[", "").replace("]", "")
                j++ // increment number of chords added
            } else {
                // otherwise fill with a blank space
                if (top_line.length > bottom_line.length)
                    bottom_line += new_line.charAt(i)
                else {
                    bottom_line += new_line.charAt(i)
                    top_line += " "
                }
            }
        }

        // if the top line is just a blank string, don't bother printing it
        if (top_line == " ".repeat(bottom_line.length))
            textDiv.innerHTML = textDiv.innerHTML + `<p> ${line}</p>`
        // concatonate top and bottom strings and output
        else
            textDiv.innerHTML = textDiv.innerHTML + `<pre> ${'<span class="chord">' + top_line + '</span>'.concat("\n", `<p> ${bottom_line}</p>`)}</pre>`
    }
}