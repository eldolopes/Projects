const createDatabase = db => async() => {     
    const database = await db.run(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `, function(res){
        if(res.error)
            throw res.error
        console.log(res)
    })
    return database
}

const getAllFilters = req => () => {
    const allFilters = req.query    
    return allFilters
}

const getAllProffys = async(db) => {
    const findAll = await db('proffy').select('*')
    return findAll 
}

const getAllClasses = async(db) => {
    const allClasses = await db('classes').select('*')
    return allClasses
}

module.exports = {
    createDatabase,
    getAllProffys,
    getAllFilters,
    getAllClasses
}