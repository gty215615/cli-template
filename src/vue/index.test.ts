let logInfo = ''
const log = console.log = jest.fn((text: string) => logInfo = text)

import Observe from './Observe'
import Dep, { popTarget, pushTarget, targetStack } from './Dep'
import computed from './Computed';
import Watcher from './Watcher';
import watch from './Watch'
describe('Observe test', () => {
    it('the data should be tracked', () => {
        const data = { count: 1 };
        new Observe(data);
        const count = data.count
        expect(logInfo).toBe('count was tracked')
        log('update')
        data.count++;
        expect(logInfo).toBe('count was tracked')
    })
    it('watcher function is run when the count was changed', () => {
        const data = { count: 1 };
        new Observe(data);
        new Watcher(() => {
            let a = data.count;
            console.log('count was changed');
        })
        data.count = 2;
        expect(logInfo).toBe('count was changed')
    })
    it('the data of computed is change by origin data', () => {
        const data = { count: 1 };
        new Observe(data);
        const plus = computed(() => {
            return data.count + 1
        })
        expect(plus.value).toBe(2)
        data.count++;
        expect(plus.value).toBe(3)
        const a = plus.value + 1
        expect(a).toBe(4)
    })
    it('get the data change value', () => {
        const data = { count: 1 };
        new Observe(data);
        watch(() => {
            return data.count
        }, (newVal, oldVal) => {
            expect(newVal).toBe(2)
            expect(oldVal).toBe(1)
        })
      
        data.count++;
       
    })
})

