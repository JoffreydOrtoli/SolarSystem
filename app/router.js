const express = require('express');
const planets = require('./data/planets');
const countrys = require('./data/countrys');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("acceuil");
})

router.get('/solarsystem', (req, res) => {
        res.render('solarsystem', {
            planets: planets,
        });
});
router.get('/planete/:name', (req, res, next) => {
    const askedPlanets = req.params.name;

    let foundPlanet = null;
    for (const planet of planets) {
        if (planet.name === askedPlanets) {
            foundPlanet = planet;
            break;
        }
    }
    if (foundPlanet) {
        res.render(`planets`, {  
            planet: foundPlanet,
        });
    }
    else {
        next();
    }
});

router.get('/terre/countrys', (req, res) => {
    const filterArray = [];
    if (req.query.searchCountry || req.query.searchCapital || req.query.searchContinent) {
        const loweredQueryCountry = req.query.searchCountry.toLowerCase();
        const loweredQueryCapital = req.query.searchCapital.toLowerCase();
        const loweredQueryContinent = req.query.searchContinent.toLowerCase();
        for (const country of countrys) {
            if(country.name.toLowerCase().includes(loweredQueryCountry) && country.capital.toLowerCase().includes(loweredQueryCapital) && country.continent.toLowerCase().includes(loweredQueryContinent)) {
                filterArray.push(country);
            };
        };
        res.render('countrys', {
            countrys: filterArray,
        });
    }
    else {
        res.render("countrys", {
            countrys: countrys,
        });
    } 
});

router.use(function (req, res) {
    res.status(404).render('notfound');
});
  module.exports = router;