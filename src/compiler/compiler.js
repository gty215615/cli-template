



const tokenType = {
    WHITESPACE: /\s/,
    NUMBER: /[0-9]/,
    TOKEN: /[A-Z]/i,
    STRING: '"',
    ASSIGN: '=',
    OPERATOR: /[+|-|\/|\*|&&|\|\|]/
}

export function tokenizer(code) {
    let current = 0
    const token = [];
    const length = code.length;

    while (current < length) {
        const char = code[current]
        //  match '('
        if (char === '(') {
            current++
            token.push({
                type: 'paren',
                value: '('
            })
        }
        //  match ')'
        else if (char === ')') {
            current++
            token.push({
                type: 'paren',
                value: ')'
            })
        }
        else if (tokenType.WHITESPACE.test(char)) {
            current++
        }
        else if (tokenType.STRING === char) {
            let string = '';
            while (code[++current] !== '"') {
                string += String(code[current])
            }
            token.push({
                type: 'string',
                value: string
            })
        }
        else if (tokenType.ASSIGN === char) {
            current++
            token.push({
                type: 'assign',
                value: tokenType.ASSIGN
            })
        }
        else if (tokenType.OPERATOR.test(char)) {
            current++
            token.push({
                type: 'OPERATOR',
                value: char
            })
        }
        else if (tokenType.NUMBER.test(char)) {
            let number = char
            current++
            while (tokenType.NUMBER.test(code[current])) {
                number += String(code[current])
                current++
            }
            token.push({
                type: 'number',
                value: Number(number)
            })
        }
        else if (tokenType.TOKEN.test(char)) {
            let tokenUnit = char
            current++
            while (code[current] && tokenType.TOKEN.test(code[current])) {
                tokenUnit += String(code[current])
                current++
            }
            token.push({
                type: 'name',
                value: tokenUnit
            })
        } else {

            current++
            throw new Error('the char is not in ')
        }
    }

    return token
}

export function parser(tokens) {
    let current = 0;
    function walk() {
        let token = tokens[current]
        if (token.type === 'number') {
            current++
            return {
                type: "NumberLiteral",
                value: token.value
            }
        } else if (token.type === 'string') {
            current++
            return {
                type: "StringLiteral",
                value: token.value
            }
        }
        else if (token.type === 'paren' && token.value === '(') {

            token = tokens[++current];

            let node = {
                type: "CallExpression",
                value: token.value,
                params: []
            }
            token = tokens[++current];
            while (token.type !== 'paren' || token.type === 'paren' && token.value !== ')') {
                //  递归循环“（）“内部的代码
                node.params?.push(walk())
                token = tokens[current]
            }
            current++
            return node
        }

        throw new TypeError(token.type)

    }
    const length = tokens.length;
    let ast = {
        type: 'Program',
        body: []
    }
    while (current < length) {
        ast.body?.push(walk())
    }
}


export function traverser(ast, vistor) {
    function traverseArray(array, parent) {
        array.forEach((item) => {
            traverseNode(item, parent)
        })
    }
    function traverseNode(node, parent) {
        const method = vistor[node.type];
        if (method && method.enter) {
            method.enter(node, parent)
        }
        switch (node.type) {
            case "Program":
                if (node.body) {
                    traverseArray(node.body, node)
                }
                break;
            case "CallExpression":
                if (node.params) {
                    traverseArray(node.params, node)
                }
                break;
            case "NumberLiteral":
            case "StringLiteral":
                break;
        }
        if (method && method.exit) {
            method.exit(node, parent)
        }

    }
    traverseNode(ast, null)

}


export function transformer(ast) {
    let newAst = {
        type: "Program",
        body: []
    }
    ast._context = newAst.body;
    traverser(ast, {
        "NumberLiteral": {
            enter: (node, parent) => {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value
                })
            }
        },
        "StringLiteral": {
            enter: (node, parent) => {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value
                })
            }
        },
        "CallExpression":{
            enter:(node, parent)=>{
                let expression = {
                    type:"CallExpression",
                    callee:{
                        type:"Identifier",
                        value:node.value
                    },
                    arguments:[]
                }

                node._context = expression.arguments
                
            }
        }
    })

}

const code = `
const a = 1
const b = 2
const c = a+b`

const token = tokenizer(code)
console.log(token);