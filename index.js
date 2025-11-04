const express = require('express');
const app = express();
const db = require('./models');
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

  app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.json(komik);
    } catch (err) {
        res.send(err);
    }
  });

    app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
 });

 app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }
        await komik.update(data);
        res.send({ message: 'Komik updated successfully', komik });
    } catch (err) {
        res.status(500).send(err);
    }
 });

app.delete('/komik/:id', async (req, res) => {
    const id  = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }

        await komik.destroy();
        res.send({ message: 'Komik deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});


    