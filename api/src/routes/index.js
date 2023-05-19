const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllerPokemon = require('../Controller/PokemonController')
const controllerType = require('../Controller/TypeController')

const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/pokemon',controllerPokemon.getAll)
router.get('/pokemon/:searPokemon',controllerPokemon.getSearch)
router.post('/pokemon',controllerPokemon.postPokemons)
router.get('/types',controllerType.getTypes)
router.delete('/pokemon/:id',controllerPokemon.deletePokemon)
router.put('/pokemon/:id',controllerPokemon.putPokemon)
router.use(function (err, req, res, next) {res.status(err.status || 500).send(err.message);});

module.exports = router;
