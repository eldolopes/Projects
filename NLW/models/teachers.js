/*const getAllTeachers = db => async() => {
    const findAll = await db('teachers').select('*')
    return findAll 
}
*/
const getAllFilters = req => () => {
    const allFilters = req.query    
    return allFilters
}

const proffys = [
    {
        name: "Eldo Lopes", 
        avatar: "https://avatars0.githubusercontent.com/u/64159516?s=460&u=3f243f900aab9ea6be0dfd9eee6d5b799a501428&v=4", 
        whatsapp: "27997886095", 
        bio: "Um cara esforçado que não irá medir esforços para aprender", 
        cost: "50", 
        subject: "JavaScript", 
        weekday: [], 
        time_from: [], 
        time_to: [],
    },
    {
        name: "Arthur Lopes", 
        avatar: "https://avatars2.githubusercontent.com/u/5180488?s=460&u=bbbf04a7c56a141f487989a36123334f95ead4ca&v=4", 
        whatsapp: "27997886095", 
        bio: "Um bebê que amo muito", 
        cost: "35", 
        subject: "Ser Amado incondicionalmente", 
        weekday: [], 
        time_from: [], 
        time_to: [],
    },
    {
        name: "Aline Lopes", 
        avatar: "https://instagram.fvix9-1.fna.fbcdn.net/v/t51.2885-19/s150x150/107841279_2698223546943911_2964417549434671003_n.jpg?_nc_ht=instagram.fvix9-1.fna.fbcdn.net&_nc_ohc=dSNF9yPgXhkAX9Dhury&oh=df76c54efc5cf23e2b4c9bf3ea2a9ff0&oe=5F5C564D", 
        whatsapp: "27997816055", 
        bio: "Uma mulher mais do que competente, super capaz de superar os limites", 
        cost: "60", 
        subject: "Estética Avançada", 
        weekday: [], 
        time_from: [], 
        time_to: [],
    },
]    
   
module.exports = {
    getAllFilters,
    proffys
}