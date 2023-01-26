

export const delayFive = (name,cb) =>{
    setTimeout(()=>{
        cb(name);
    },5000);
}

export const delayOne = (name,cb) =>{
    setTimeout(()=>{
        cb(name);
    },1000);
}