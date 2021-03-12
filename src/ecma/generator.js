
function* setTime() {
    console.log('async start!');
    yield setTimeout(() => {
        console.log('async runing!');
        a.next()
    }, 1000)
    console.log('async end!');
    return true
}

let a = setTime()
a.next()