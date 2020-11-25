const changeCoursesNumbersInPosition = (coursePosition) => {
    const courses = require('../../src/database/courses')
    const position = +coursePosition -1
    return courses[position]
}

module.exports = changeCoursesNumbersInPosition
