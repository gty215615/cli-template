import { $call, $apply, $bind } from '../this.js'
import { $new } from '../new'
import { debounce } from './debounce'
let logInfo = ''

const log = console.log = jest.fn((text) => logInfo = text)


describe('test this', () => {
    it('the $call should change this', () => {
        function say(name, sex) {
            console.log(`name is ${name}`);
            expect(logInfo).toBe('name is a')
            console.log(`name is ${sex}`);
            expect(logInfo).toBe('name is b')
        }
        const a = {}
        say.$call(a, 'a', 'b');
    })
    it('the $apply should change this', () => {
        function say(name, sex) {
            console.log(`name is ${name}`);
            expect(logInfo).toBe('name is a')
            console.log(`name is ${sex}`);
            expect(logInfo).toBe('name is b')
        }
        function eat() {
            console.log(`${this.name} is eating!`);
            expect(logInfo).toBe('abc is eating!')
        }
        const a = {
            name: 'abc'
        }
        say.$apply(a, ['a', 'b']);
        eat.$apply(a);

    })
    it('the $bind should change this', () => {
        function say(sex, age) {
            expect(this.name).toBe('abc')
            expect(sex).toBe('man')
            expect(age).toBe(15)
        }
        function eat() {
            log(`${this.name} is eating!`);
            expect(logInfo).toBe('abc is eating!')
        }
        const a = {
            name: 'abc'
        }
        try {
            a.$bind()
        } catch (e) {
            expect(e.message).toBe('this is not function')
        }
        const sayHello = say.$bind(a, 'man');
        sayHello(15)

    })
})

describe('new test', () => {
    it('new operator should be create new instance by Constructor', () => {
        function Person(name, sex) {
            this.name = name;
            this.sex = sex
        }
        const mike = $new(Person, 'mike', '男')
        expect(mike.name).toBe('mike')
        expect(mike.sex).toBe('男')
    })
    it('it should be back the Object', () => {
        function Person(name, sex, age) {
            this.name = name;
            this.sex = sex
            return {
                age
            }
        }
        const mike = $new(Person, 'mike', '男', 15)
        expect(mike.name).not.toBe('mike')
        expect(mike.sex).not.toBe('男')
        expect(mike.age).toBe(15)
    })
})

describe('test debounce', () => {
    it('the function should be run 100 times', () => {
        let i = 1
        function getCount() {
            i++
        }

        for (let i = 1; i < 100; i++) {
            getCount()
        }
        expect(i).toBe(100)
    })
    it('the function should be run once when load more times', () => {
        let i = 1
        function getCount(i) {
            i++
        }
        const test = debounce(getCount, 1000)
        for (let i = 0; i < 1000; i++) {
            test()
        }
        setTimeout(() => {
            expect(i).toBe(2)
        }, 1000)
    })
    it('the function shoule be executed immediate when the first it is executed', () => {
        let i = 1
        function getCount() {
            i++
        }
        const test = debounce(getCount, 1000, true)
        test()
        expect(i).toBe(2)
        test()
        expect(i).toBe(2)
        setTimeout(()=>{
            expect(i).toBe(3)
        },1000)
    })
})
