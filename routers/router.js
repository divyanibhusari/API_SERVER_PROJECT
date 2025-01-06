import express from "express"

import { getHome, getalllanguages, getLanguageByName, getLanguageById, getLanguageByFilter ,getSortedLanguages} from "../controllers/controller.js"

let router = express()

router.get("/", getHome)

router.get("/getalllanguages", getalllanguages)

router.get("/language/name/:name", getLanguageByName)

router.get("/language/id/:id", getLanguageById)

router.get("/language/filter",getLanguageByFilter)

router.get("/language/sortlearning", getSortedLanguages)

router.get("*", (req, res) => {

    console.log("404 hit")

    res.status(404).json({ message: "route not found !" })

})


export { router }