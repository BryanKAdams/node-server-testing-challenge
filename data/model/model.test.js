const db = require('../dbConfig')
const Users = require('./model');

describe('Users Model', function() {
    describe('test environment', function() {
        it('should use the testing environment', function(){
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('addUser()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('adds new user to the database', async function() {
            await Users.addUser({username: 'Zed', password:'Duckmoose'})
            await Users.addUser({username: 'Dovahkin', password: 'Dragonborn'})
       
            const users = await db('users');
            expect(users).toHaveLength(2);
        })
        
    
    })
    describe('getUsers()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('gets list of all users in the db', async function() {
                       const users = await db('users');
            expect(users)
        })
    })
    describe('getUsersByUsername()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('gets users by specific username', async function() {
            await Users.addUser({username: 'Test', password:'testtest'})
            const testUser = await Users.getUserByUsername('Test')
            expect(testUser.username).toBe('Test')
        })
    })
    describe('getUsersByDeparment()', function() {
        beforeEach(async () => {
            await db('users').truncate()
            await Users.addUser({username: 'E1', password: 'password', department: 'Electronics'})
            await Users.addUser({username: 'E2', password: 'password', department: 'Electronics'})
            await Users.addUser({username: 'N1', password: 'password', department: null})

        })
        it('gets all users by specific department', async function() {
           
            const electronicsUsers = await Users.getUserByDepartment('Electronics')
            expect(electronicsUsers).toHaveLength(2);
            electronicsUsers.map(user => {
                expect(user.department).toBe('Electronics')
            })
         
        })
    })
})