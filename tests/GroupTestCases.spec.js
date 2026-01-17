import{test ,expect} from "@playwright/test";
test.beforeEach(async()=>{
console.log("this is beforeEach hook")
})

test.beforeAll(async()=>{
console.log("this is beforeAll hook")
})

test.afterEach(async()=>{
console.log("this is AfterEach hook")
})

test.afterAll(async()=>{
console.log("this is AfterAll hook")
})

test.describe('Group1',()=>{
test('Login Test with valid user',async({page})=>{


});


test('Login Test with Invalid user',async({page})=>{


});

})

test.describe('Group2',()=>{
test('Login Test with Invalid username',async({page})=>{


});

test('Login Test with Valid user',async({page})=>{


});

})