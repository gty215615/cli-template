import { TObserve } from './Observe'
export const isPlainObject = (target: TObserve) => {
    return getOriginType(target) === OriginType.OBJECT
}

export const isArray = (target: TObserve) => {
    return getOriginType(target) === OriginType.ARRAY
}

export const getOriginType = (target: any) => {
    return Object.prototype.toString.call(target).slice(8, -1);
}

export enum OriginType {
    OBJECT = 'Object',
    ARRAY = 'Array',
    STRING = 'String',
    NUMBER = 'Number',
    BOOLEAN = 'Boolean',
}

