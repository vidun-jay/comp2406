const fs = require('fs')

/**
 * Extracts the chords from a given string into an array
 * @param str String to parse chords from
 * @returns Array of chords
 */
function extractChords(str) {
    // return an array of all the string elements in the form "[x]" using regex
    return str.match(/\[(.*?)\]/gs)
}

fs.readFile('songs/sister_golden_hair.txt', function(err, data) {
    if(err) throw err
    let array = data.toString().split("\n")
    for(let line of array) {
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
            console.log(line);
        // concatonate top and bottom strings and output to console
        else {
            results = top_line.concat("\n", bottom_line)
            console.log(results);
        }
    }
})
console.log("DONE")