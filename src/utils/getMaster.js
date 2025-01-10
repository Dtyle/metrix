// Retrieve all Languages Name By Id from the database.
exports.getLanguagesNameById = async (
    languages_ids = [],
    language_others = ""
) => {
    try {
        let languages_ids_array = Array.isArray(languages_ids)
            ? languages_ids
            : languages_ids.split(",");
        let languages_name = "";
        for (let i = 0; i < languages_ids_array.length; i++) {
            const element = languages_ids_array[i];
            if (element !== "10") {
                const language = LanguagesMasterGlobal[`languagesMaster_${element}`];
                if (language) {
                    languages_name += language.languagesName;
                }
            } else {
                languages_name += language_others;
            }
            if (i < languages_ids_array.length - 1) {
                languages_name += ", ";
            }
        }
        console.log("languages_name:", languages_name);
        return languages_name;
    } catch (error) {
        console.error(error);
        return "";
    }
};

