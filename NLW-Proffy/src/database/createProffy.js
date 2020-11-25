const createProffy = async() => {
    const {insertProffy, insertClasse, insertClasseSchedule, id} = require('./db')
    const createProffy = await sqlite.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsaspp,
            bio
        ) VALUES (
            '${insertProffy.name}',
            '${insertProffy.avatar}',
            '${insertProffy.whatsapp}',
            '${insertProffy.bio}'
        ); SELECT * FROM proffys WHERE id=${createProffy.id}
    `)
    
    const proffy_lastID = createProffy.id

    const createClasse = await sqlite.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            '${insertClasse.subject}',
            '${insertClasse.cost}',
            '${proffy_lastID}'
        ); SELECT last_id()
    `)
    const classe_lastID = createClasse.lastID

    const insertAllClassesScheduleValues = insertClasseSchedule.map( value => {        
       const schedule = Promise.all( sqlite.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to                
            ) VALUES (
                '${classe_lastID}',
                '${value.weekday}',
                '${value.time_from}',
                '${value.time_to}'                
            );
        `))
        return schedule
    })
    await insertAllClassesScheduleValues
}

 createProffy()


module.exports = createProffy