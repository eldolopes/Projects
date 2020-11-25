const allTeachersModels = require('../models/teachers')
const allCourses = require('../src/database/courses')
const weekdays = require('../public/utils/weekdays')

const teachers = db => async(req, res) => {
    const allFilters = await allTeachersModels.getAllFilters(req)()
    const allProffys = await allTeachersModels.getAllProffys(db)
    const allClasses = await allTeachersModels.getAllClasses(db)
    //const allTeachers =  allTeachersModels.proffys
    res.render('study', {
        allProffys,
        allClasses,
        allFilters,
        allCourses,
        weekdays
    })
    console.log("Todos os proffys", allProffys)
    console.log("Todos os cursos", allClasses)
}

const giveClasses = () => (req, res) => {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    console.log(data)
    if(isNotEmpty){
        const changeCoursesOnPosition = require('../public/scripts/changeCoursesOnPosition')
        data.subject = changeCoursesOnPosition(data.subject)
        //AQUI PRECISO PASSAR O CAMINHO PARA ADICIONAR AO BANCO DE DADOS
        //allTeachersModels.proffys.push(data) 
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