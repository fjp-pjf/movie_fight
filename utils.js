const debounce = (func,delay = 1000) =>{//1000ms will be the default delay
    let timeoutId;
    return (...args) =>{
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};