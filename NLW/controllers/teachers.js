const allTeachersModels = require('../models/teachers')
const allCourses = require('./courses')
const weekdays = require('./weekdays')


const teachers = ()  => (req, res) => {
    const allFilters =  allTeachersModels.getAllFilters(req)()
    const allTeachers =  allTeachersModels.proffys
    res.render('study', {
        allTeachers,
        allFilters,
        allCourses,
        weekdays
    })
    console.log(allFilters)
}



const giveClasses = () => (req, res) => {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    if(isNotEmpty){
        const changeCoursesNumbersInPosition = require('../public/scripts/courses')
        data.subject = changeCoursesNumbersInPosition(data.subject)
        allTeachersModels.proffys.push(data)
        return res.redirect("/study")
    }

    return res.render('give-classes', {
        allCourses,
        weekdays
    })
}

module.exports = {
    teachers,
    giveClasses
}