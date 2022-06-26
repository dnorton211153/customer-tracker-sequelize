const db = require('./models')
const seed = require('./seeders/index');

const run = async () => {
    await db.initialize();
    await db.sequelize.sync({ force: true });
    await seed();
}

run();