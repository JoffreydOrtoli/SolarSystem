const express = require('express');
const planets = require('./data/planets');
const countrys = require('./data/countrys');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
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

router.get('/terre/:country', (req, res, next) => {
    const askedCountry = req.params.country;

    let foundCountry = null;
    for (const country of countrys) {
        if (country.name === askedCountry || country.capital === askedCountry) {
            foundCountry = country;
            break;
        }
    }
    if (foundCountry) {
        res.render('country', {
            country: foundCountry,
        })
    }
    else {
        next();
    }
})

router.get('/terre/:continent', (req, res, next) => {
    const askedContinent = req.params.continent;
    
    let foundContinent = [];
    for (const country of countrys) {
        if (country.continent === askedContinent) {
            foundContinent.push(country);
        }
    }
    if (foundContinent) {
        res.render('continent', {
            countrys: foundContinent,
        })
    }
    else {
        next();
    }
});  

router.use(function (req, res) {
    res.status(404).render('notfound');
});
  module.exports = router;