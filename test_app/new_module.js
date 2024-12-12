function add(a,b) {
    return a+b;
}
function sub(a,b) {
    return a-b;
}

// 1. exports just single function
    // module.exports = add

// 2. Multiple export 

    // module.exports = {
    //     add,
    //     sub
    // };

    // you can change the name as well 
    // module.exports = {
    //     addition : add,
    //     substraction : sub
    // };

    // Another way of of doing 
    exports.addition = add;
    exports.substration  = sub;