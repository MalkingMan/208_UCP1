const express = require('express');
const app = express();
const db = require('./models');
const port = 3309;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

  app.get('/film', async (req, res) => {
    try {
        const film = await db.Film.findAll();
        res.json(film);
    } catch (err) {
        res.send(err);
    }
  });

  app.get('/film', async (req, res) => {
    try {
        const film = await db.Film.findAll();
        res.json(film);
    } catch (err) {
        res.send(err);
    }
  });

    app.post('/film', async (req, res) => {
    const data = req.body;
    try {
        const film = await db.Film.create(data);
        res.send(film);
    } catch (err) {
        res.send(err);
    }
 });

 app.put('/film/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const film = await db.Film.findByPk(id);
        if (!film) {
            return res.status(404).send({ message: 'Film not found' });
        }
        await film.update(data);
        res.send({ message: 'Film updated successfully', film });
    } catch (err) {
        res.status(500).send(err);
    }
 });

app.delete('/film/:id', async (req, res) => {
    const id  = req.params.id;
    try {
        const film = await db.Film.findByPk(id);
        if (!film) {
            return res.status(404).send({ message: 'Film not found' });
        }

        await film.destroy();
        res.send({ message: 'Film deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});


    