/* Example of javascript functions

Example adapted from:
 "Elequent Javascript" 2nd ed. by Marijn Haverbeke
http://eloquentjavascript.net/03_functions.html


Exercise 1:

Modify the code given below so that the hill function makes use of the
underscore character, just like the flat function does,
expect the mountain tops will have to be drawn on the previous line of the output.

Also modify the code so that the following script portion will
result in the terrain shown.

  //BUILD SCRIPT
  flat(3)
  hill(5)
  flat(2)
  hill(3)
  flat(4)
  hill(0)
  flat(2)
  //END SCRIPT


function and the program produces the following terrain.

    _____    ___
___/     \__/   \____/\__


Exercise 2:

Modify the code from exercise 1 so you can have both hills and mountains.
Mountains are require two output lines.

After completing exercise 2 the following BUILD SCRIPT portion should produce the output shown.

  //BUILD SCRIPT
  flat(3)
  mountain(3)
  flat(2)
  mountain(0)
  flat(4)
  hill(1)
  flat(1)
  //END SCRIPT


function and the program produces the following terrain.

     ___
    /   \    /\      _
___/     \__/  \____/ \_


*/

function landscape() {
  let top_line = ""
  let middle_line = ""
  let bottom_line = ""

  function flat(size) {
    top_line += " ".repeat(size)
    middle_line += " ".repeat(size)
    bottom_line += "_".repeat(size)
    middle_line += " "
  }

  function hill(size) {
    // incline
    middle_line += ""
    bottom_line += "/"

    // peak
    middle_line += "_".repeat(size)
    bottom_line += " ".repeat(size)

    // decline
    middle_line += " "
    bottom_line += "\\"
  }

  function mountain(size) {
    // incline
    top_line += " "
    middle_line += ""
    bottom_line += "/"
    top_line += " "
    middle_line += "/"
    bottom_line += " "

    // peak
    top_line += "_".repeat(size)
    middle_line += " ".repeat(size)
    bottom_line += " ".repeat(size)

    // decline
    top_line += " "
    middle_line += "\\"
    bottom_line += " "
    top_line += " "
    middle_line += " "
    bottom_line += "\\"
  }

  //BUILD SCRIPT
  /* Problem 1 Testing */
  // flat(3)
  // hill(5)
  // flat(2)
  // hill(3)
  // flat(4)
  // hill(0)
  // flat(2)

  /* Problem 2 Testing */
  flat(3)
  mountain(3)
  flat(2)
  mountain(0)
  flat(4)
  hill(1)
  flat(1)
  //END SCRIPT
  return top_line.concat('\n', middle_line).concat('\n', bottom_line)

}

console.log("")
console.log(landscape())
//  ___/''''\______/'\_