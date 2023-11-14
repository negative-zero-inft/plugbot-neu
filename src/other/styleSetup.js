module.exports = (tosetup, username) =>{

    const os = require('os')

    var totalmem = os.totalmem()
    var freemem = os.freemem()
            
    totalmem = totalmem / 1024 / 1024 / 1024
    freemem = freemem / 1024 / 1024 / 1024
            
    var freememgb = Math.round(freemem * 1)
    var totalmemgb = Math.round(totalmem * 1)
            
    var cpus = os.cpus()
            
    var cpumodel = cpus[0].model
            
    var ostype = os.type

    var cpuarch = os.arch

    var cpuclock = cpus[0].speed

    var hostname = os.hostname

    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
        
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
    // current year

    let year = date_ob.getFullYear();
        
    // current hours

    let hours = date_ob.getHours();
        
    // current minutes
    
    let _minutes = date_ob.getMinutes();
        
    let minutes = _minutes.toString().length == 0 ? "0" + _minutes.toString() : _minutes

    // current seconds

    let seconds = date_ob.getSeconds();
    
    const finishedproduct = tosetup
    .replace(/'DY'/g, year)
    .replace(/'DD'/g, date)
    .replace(/'DM'/g, month)
    .replace(/'DH'/g, hours)
    .replace(/'DMI'/g, minutes)
    .replace(/'DS'/g, seconds)
    .replace(/'N'/g, `\n`)
    .replace(/'FM'/g, freememgb)
    .replace(/'AM'/g, totalmemgb)
    .replace(/'CPUM'/g, cpumodel)
    .replace(/'OSTYPE'/g, ostype)
    .replace(/'CPUARCH'/g, cpuarch)
    .replace(/'CPUCLOCK'/g, cpuclock)
    .replace(/'U'/g, username)
    .replace(/'HN'/g, hostname)

    return finishedproduct
}