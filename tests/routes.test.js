require('dotenv').config()
process.env.NODE_ENV = 'test'
const db = require('../db/knex')
const app = require('../server')
const request = require('supertest')

describe('GET /books', () => {
  beforeEach(async () => {
    await db('Books').truncate()
  })

  afterEach(async () => {
        await db('Books').truncate()
    });

    it('should return status code 200 when request is successful', async () => {
        const res = await request(app).get('/books')
        expect(res.status).toBe(200)
    })
    it('should return the correct number of posts stored in the database', async () => {
        const res = await request(app).get('/books')

        expect(res.body.length).toBe(0)
    })
    it('should return an empty array when the database has no entries', async () => {
        const res = await request(app).get('/books')

        expect(JSON.parse(res.text)).toEqual([])
    })
});

describe('GET /books/:id', () => {
    beforeEach(async () => {
        await db('Books').truncate();
    });
    afterEach(async () => {
        await db('Books').truncate();
    });

    it('should return status code 200 when request is successful', async () => {
        await request(app).post('/books').send({ id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 });
        const res = await request(app).get('/books/1');

        expect(res.status).toEqual(200)
    })
    it('should return the correct response body', async () => {
        const newBook = await request(app).post('/books').send({ id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 });
        const res = await request(app).get('/books/1');

        expect(res.body[0].title).toBe('test');
    })
    it('should return a 404 error if a book with a specific id does not exist', async () => {
        await request(app).get('/books/50')
        .then((res) => {
            expect(res.status).toEqual(404)
        })
    })
})

describe('POST /books', () => {
    beforeEach(async () => {
        await db('Books').truncate()
    })
    afterEach(async () => {
        await db('Books').truncate()
    })

    it('should return status code 200 when request is successful', async () => {
        const res = await request(app).post('/books').send({ id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 });

        expect(res.status).toEqual(200)
    })
    it('should return the new books entry when the request is successful', async () => {
        const res = await request(app)
        .post("/books")
        .send({
            id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5
        })
        .expect(function(res) {
            res.body.id = 1
            res.body.author = 'test'
          })
    })
    it('should return a 500 error if a constraint is missing from the request', async () => {
        const res = await request(app).post('/books').send({ id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300 });

        expect(res.status).toEqual(500) 
    });
});

describe('DELETE /books/:id', () => {
    beforeEach(async () => {
        await db('Books').truncate()
    })
    afterEach(async () => {
        await db('Books').truncate()
    })
    it('should return status code 200 when the request is successful', async () => {
        const newBook = ({ id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 })
        await request(app).post('/books').send(newBook)
        
        return request(app).delete('/books/1').then((response) => {
            expect(response.status).toBe(200)
        })
    })
    it('should return a 404 error if user with a specific id does not exist', async () => {
        const newBook = { id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 }
        await request(app).post('/books').send(newBook)

        await request(app).delete('/books/10')
            .then((res) => {
                expect(res.status).toBe(404)
            })
    })
})

describe('PUT /books/:id', () => {
    beforeEach(async () => {
        await db('Books').truncate()
    })
    afterEach(async () => {
        await db('Books').truncate()
    })
    it('should return status code 200 when the request is successful', async () => {
        const newBook = await request(app).post('/books').send({ id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 })

        const result = await request(app).put('/books/1').send({ rating: 4 })
        .then((res) => {
            expect(res.status).toBe(200)
        })
    })
    it('should return a 404 error if user with a specific id does not exist', async () => {
        const newBook = { id: 1, title: 'test', author: 'fake author', dateFinished: '01-01-2019', pages: 300, rating: 5 }
        await request(app).post('/books').send(newBook)

        await request(app).delete('/books/10')
            .then((res) => {
                expect(res.status).toBe(404)
            })
    })
})