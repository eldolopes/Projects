const sqlite = require('sqlite-sync')
sqlite.connect(__dirname + "/database.sqlite")

const insertProffy = 
    sqlite.insert('proffys',{
        name: "Amor da Vida", 
        avatar: "https://avatars2.githubusercontent.com/u/5180488?s=460&u=bbbf04a7c56a141f487989a36123334f95ead4ca&v=4", 
        whatsapp: "27997886095", 
        bio: "Testando" 
    })

const insertClasse = 
    sqlite.insert('classes',{
        subject: "Portugês", 
        cost: "100" 
    })
   


const insertClasseSchedule = 
    sqlite.insert('class_schedule',[
        {
            weekday: 1, 
            time_from: 720, 
            time_to: 1200 
        },
        {
            weekday: 1, 
            time_from: 870, 
            time_to: 2200 
        }
    ]
)    
//insertProffy()
//insertClasse()
//SinsertClasseSchedule()

//console.log()

module.exports = {
    createDatabase,
    getAllProffys,
    getAllClasses,
    insertProffy,
    insertClasse,
    insertClasseSchedule
}