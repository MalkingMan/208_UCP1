module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define('Komik', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_film: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.STRING,
    },
    sutradara: {
      type: DataTypes.STRING,
    },
    tahun_terbit: {
        type: DataTypes.DATE,
    },
    genre: {
        type: DataTypes.STRING,
    }

  });

  return Film;
};
