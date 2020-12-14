const {expect} = require('chai');
const db = require('./server/db');
const app = require('supertest')('./server/index')
const syncAndSeed = require('./server/db');


// describe('models',()=>{
//     describe('seeded data',()=>{
//         xit('there are 6 reviews',()=>{

//         })

//         xit('there are 6 locations',()=>{

//         })

//         xit('there are 3 categories',()=>{

//         })

//     })
// })


describe('routes',()=>{
    describe('GET /api/reviews',()=>{
        it('returns 6 reviews',async()=>{
            const response = await app.get('/api/reviews');
            expect(response.body.length).to.equal(6);
        })
    })

    describe('GET /api/locations',async()=>{
        it('returns 6 locations',async()=>{
            const response = await app.get('/api/locations')
            expect(response.body.length).to.equal(6);
        })
    })

    describe('GET /api/categories',async()=>{
        it('returns 3 categories',async()=>{
            const response = await app.get('/api/categories')
            expect(response.body.length).to.equal(3);
        })
    })
})