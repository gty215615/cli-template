import sum from './index'

let logInfo = ''
const log = console.log = jest.fn((text:string)=> logInfo = text)

describe('it is a test',()=>{
    it('1 + 2 = 3',()=>{
        expect(sum(1,2)).toBe(3)
        console.log(sum(1,2));  
        expect(logInfo).toBe(3)
    })
})