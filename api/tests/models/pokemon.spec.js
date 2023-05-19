const { Pokemons, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemons.sync({ force: false }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemons.create({})
          .then(() => done('No se pudo insertar el Pokemon: SequelizeValidationError: notNull Violation: pokemons.name cannot be null'))
          .catch(() => done());
      });
    });
  });
});
