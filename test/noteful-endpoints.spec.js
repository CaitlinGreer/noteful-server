const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeFoldersArray } = require('./folders-fixtures')
const { makeNotesArray } = require('./notes-fixtures')

describe('Folders Endpoints', function() {
    let db

    before('make knex instance', () => {

        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'))
  
    afterEach('cleanup', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'))


describe('GET /api/folders', () => {
    context(`Given no folders in the database`, () => {
        it(`responds with 200 and an empty list`, () => {
            return supertest(app)
                .get('/api/folders')
                .expect(200, [])
        })
    })

    context(`Given there are folders in the database`, () => {
        const testFolders = makeFoldersArray()
        const testNotes = makeNotesArray()

        
        beforeEach('insert folders', () => {
            return db
                .into('noteful_folders')
                .insert(testFolders)
                .then(() => {
                    return db 
                        .into('noteful_notes')
                        .insert(testNotes)
                })
        })

        it (`GET /api/folders responds with 200 and all folders`, () => {
            return supertest(app)
                .get('/api/folders')
                .expect(200, testFolders)
        })
    })
// insert XSS Tests here

    describe(`GET /api/folders/:folder_id`, () => {
        context('Given no folders', () => {
            it(`responds with 404`, () => {
                const folderId = 123456
                return supertest(app)
                    .get(`/api/folders/${folderId}`)
                    .expect(404, {error: { message: `Folder doesn't exist` }} )
            })
        })

        context(`Given there are folders in the database`, () => {
            const testFolders = makeFoldersArray()
            const testNotes = makeNotesArray()
            
            beforeEach('insert folders', () => {
                return db
                    .into('noteful_folders')
                    .insert(testFolders)
                    .then(() => {
                        return db 
                            .into('noteful_notes')
                            .insert(testNotes)
                    })
        })

            it(`responds with 200 and the specified folder`, () => {
                const folderId = 2
                const expectectFolder = testFolders[folderId -1]
                return supertest(app)
                    .get(`/api/folders/${folderId}`)
                    .expect(200, expectectFolder)
            })
        })

    
    })
})
})