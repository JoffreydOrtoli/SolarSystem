const express = require('express');
const planets = require('./data/planets');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("acceuil");
})

router.get('/solarsystem', (req, res) => {
    if (req.query.search) {
        const filterPlanets = [];
        const loweredQuery = req.query.search.toLowerCase();
        for (const planet of planets) {
            if(planet.name.includes(loweredQuery)) {
                filterPlanets.push(planet);
            }
        }
        res.render('solarsystem', {
            planets: filterPlanets,
        });
    }
    else {
        res.render('solarsystem', {
            planets: planets,
        })
    }
})

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

router.use(function (req, res) {
    res.status(404).render('notfound');
});

  module.exports = router;