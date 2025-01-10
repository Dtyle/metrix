const LanguagesMasterRepo = require("../repository/");


// Retrieve all Languages Master from the database.
exports.findAllLanguagesMaster = async (req, res) => {
    try {
        let response = await LanguagesMasterRepo.getAllMaster();
        if (!response) {
            console.log("Languages Master not found ")
            global.LanguagesMasterGlobal = []
        }
        //  console.log("Languages Master Global added")
        let languagesMasterobj = {}
        response.forEach(element => {
            languagesMasterobj['languagesMaster_' + element['id']] = element
        });
        global.LanguagesMasterGlobal = languagesMasterobj
    } catch (error) {
        console.log("Languages Master Error ")
        global.LanguagesMasterGlobal = []
        console.error(error);
    }
};

