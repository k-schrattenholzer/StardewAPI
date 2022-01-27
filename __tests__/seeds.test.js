const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Seed = require('../lib/models/Seed.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool)
  })

  afterAll(() => {
    pool.end()
  })

  it('should create a seed', async() => {
    const res = await request(app)
      .post('/api/v1/seeds')
      .send({
        name: "Jazz Seeds",
        crop: "Blue Jazz",
        abt: "Plant these in the summer. Takes 12 days to mature.",
        sell_price: "15g",
        img: 'https://stardewvalleywiki.com/mediawiki/images/9/95/Jazz_Seeds.png'
      })

    const expectation = {
      id: expect.any(String),
      name: "Jazz Seeds",
      crop: "Blue Jazz",
      abt: "Plant these in the summer. Takes 12 days to mature.",
      sell_price: "15g",
      img: 'https://stardewvalleywiki.com/mediawiki/images/9/95/Jazz_Seeds.png'
    }

      expect(res.body).toEqual(expectation)

      // await Seed.deleteById(res.body.id)
  })

  it('should get all seeds', async() => {
    const res = await request(app).get('/api/v1/seeds')

    const seedList = [{
      id: expect.any(String),
      name: "Melon Seeds",
      crop: "Melon",
      abt: "Plant these in the summer. Takes 12 days to mature.",
      sell_price: "40g",
      img: 'https://stardewvalleywiki.com/mediawiki/images/5/5e/Melon_Seeds.png'
    }]

    expect(res.body).toEqual(seedList)
  })

});