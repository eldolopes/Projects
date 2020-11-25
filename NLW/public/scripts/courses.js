const changeCoursesNumbersInPosition = (coursePosition) => {
    const courses = require('../../controllers/courses')
    const position = +coursePosition -1
    return courses[position]
}

module.exports = changeCoursesNumbersInPosition
