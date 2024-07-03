function calculateFibonacci(number) {
    // this code is snychonous and will execute competely in call stack
    if (number <= 1) {
        return number;
    }
    return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
}

process.on("message",function({target}){
    const result=calculateFibonacci(parseInt(target));
    process.send(result);
})