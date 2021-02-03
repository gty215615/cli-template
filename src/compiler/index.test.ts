import { tokenizer } from './compiler'

describe('test token', () => {
    it('should be parse ast', () => {
        const code = `
        const a = 1
        const b = 2
        const c = a+b`

        const token = tokenizer(code)
        console.log(token);
        
    })
})