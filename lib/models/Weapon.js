const pool = require('../utils/pool.js')

module.exports = class Weapon {
  id;
  type;
  name;
  level;
  abt;
  damage;
  img;

  constructor (row) {
    this.id = row.id;
    this.type = row.type,
    this.name = row.name, 
    this.level = row.level,
    this.abt = row.abt,
    this.damage = row.damage,
    this.img = row.img
  }

  static async insert({  type, name, level, abt, damage, img }) {
    const { rows } = await pool.query(
      'INSERT INTO weapons(type, name, level, abt, damage, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [type, name, level, abt, damage, img ]
    )
    return new Weapon(rows[0])
  }
}