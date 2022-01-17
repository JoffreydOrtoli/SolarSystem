const express = require('express');
const planets = require('./planets');

const router = express.Router();

router.get('/', (req, res) => {
    res.render(`acceuil`, {
        author: 'Mahh',   
        planets: planets,
    });
});
router.get('/:name', (req, res) => {
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
            author: 'Mahh',   
            planet: foundPlanet,
        });
    }
    else {
        res.sendStatus(404);
    }
});

  module.exports = router;