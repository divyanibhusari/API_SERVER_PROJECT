import { languages } from "../database.js"

let getHome = (req, res) => {

    res.status(200).json({

        message: "Welcome to languageMedia",

        actions: [
            { method: "get", route: "/getalllanguages", path: false, query: false },

            { method: "get", route: "/language/name/:name", path: "name", query: false },

            { method: "get", route: "/language/id/:id", path: "id", query: false },

            { method: "get", route: "/language/filter?scope='value'", path: false, query: "scope", scope: ["web development", "mobile development", "database management", "engineering simulations", "system administration", "system scripting", "data analysis", "statistics", "system programming", "game development", "big data", "enterprise applications", "cloud development", "game development", "desktop applications", "data science", "AI", "iOS development", "android development"] },

            { method: "get", route: "/language/filter?level='value'", path: false, query: "level", level: ["basic", "higher", "mid"] },

            { method: "get", route: "/language/filter?duration_month_limit='value'", path: false, query: "duration_month_limit", value: "less than what" },

            { method: "get", route: "/language/filter?forBeginner='value'", path: false, query: "forBeginner", value: "true/false" },

            { method: "get", route: "/language/filter?difficuly='value'", path: false, query: "forBeginner", value: "easy/mid/hard" }
        ]
    })
}
let getalllanguages = (req, res) => {

    res.status(200).json({ length: languages.length, languages })

}
let getLanguageByName = (req, res) => {

    let { name } = req.params

    console.log(name)

    if (!name) {

        res.status(400).json({ result: "invalid or missing name !" })

    }
    let result = languages.filter((language) => {

        return language.name.toLowerCase() == name.toLowerCase()

    })

    if (result.length != 0) {

        res.status(200).json({ message: `you were looking for  ${name} language`, result: result })

    } else {

        res.status(404).json({ message: `you were looking for  ${name} language`, result: "language you were looking for  is not found !" })
    }
}

let getLanguageById = (req, res) => {

    let { id } = req.params

    console.log(id)

    if (!id) {

        res.status(400).json({ result: "invalid or missing id !" })

    }
    let result = languages.filter((language) => {

        return language.id == id

    })
    if (result.length != 0) {

        res.status(200).json({ message: `you were looking for id ${id} language`, result: result })

    } else {

        res.status(404).json({ message: `you were looking for id ${id} language`, result: "id does not exits !" })

    }
}
let getLanguageByFilter = (req, res) => {
    // scope, level, duration_month_limit, forBeginner, difficulty

    // we are only able to perform 1 filter at a time
    let { scope, level, duration_month_limit, forBeginner, difficulty } = req.query

    if (!scope && !level && !duration_month_limit && !forBeginner && !difficulty) {

        res.status(400).json({ message: "Not a valid filter query !" })
    }
    if (scope) {

        let result = scopeFilter(scope)

        res.status(200).json({ message: `scope filter passed value is : ${scope} `, result })
    }


    if (level) {
        let result = scopeLevel(level)

        res.status(200).json({ message: `scope level passed value is : ${level}`, result })
    }

    if (duration_month_limit) {
        let result = scopeDuration_Month_Limit(duration_month_limit)

        res.status(200).json({ message: `scope duration_month_limit  passed value is : ${duration_month_limit}`, result })
    }

    if (forBeginner) {



        let result = scopeForBeginner(forBeginner)

        res.status(200).json({ message: `scope forBeginner  passed value is : ${forBeginner}`, result })
    }

    if (difficulty) {
        let result = scopeDiffculty(difficulty)

        res.status(200).json({ message: `scope difficulty  passed value is : ${difficulty}`, result })
    }

    function scopeFilter(matchWithScope) {

        let filteredArray = []

        filteredArray = languages.filter((language) => {

            let flag = false;

            language.scope.forEach((scope) => {
                if (scope.toLowerCase() == matchWithScope.toLowerCase()) {
                    flag = true
                }
            })

            return flag ? language : null

        })

        return filteredArray

    }

    function scopeLevel(matchWithLevel) {

        let filteredArray = []

        filteredArray = languages.filter((language) => {

            return language.level.toLowerCase() == matchWithLevel.toLowerCase()

        })

        return filteredArray

    }

    function scopeDuration_Month_Limit(matchwith_duration_month_limit) {

        let filteredArray = []

        filteredArray = languages.filter((language) => {

            return language.duration_month <= matchwith_duration_month_limit

        })

        return filteredArray

    }

    function scopeForBeginner(matchWithForBeginner) {

        let filteredArray = []

        filteredArray = languages.filter((language) => {

            return language.forBeginner.toLowerCase() == matchWithForBeginner.toLowerCase()

        })

        return filteredArray

    }

    function scopeDiffculty(matchWithDifficulty) {

        let filteredArray = []

        filteredArray = languages.filter((language) => {

            return language.difficuly.toLowerCase() == matchWithDifficulty.toLowerCase()

        })

        return filteredArray

    }

}
let getSortedLanguages = (req, res) => {

    let result = languages.sort((a, b) => {
        return a.duration_month - b.duration_month
    })

    res.status(200).json({ message: "sorted based on duration", result })
}

export { getHome, getalllanguages, getLanguageByName, getLanguageById, getLanguageByFilter ,getSortedLanguages }