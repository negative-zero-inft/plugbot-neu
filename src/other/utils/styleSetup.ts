import os from "os";

export default (tosetup: string, username?: string) => {

    let totalmem = os.totalmem();
    let freemem = os.freemem();

    totalmem = totalmem / 1024 / 1024 / 1024;
    freemem = freemem / 1024 / 1024 / 1024;

    const freememgb = Math.round(freemem * 1);
    const totalmemgb = Math.round(totalmem * 1);

    const cpus = os.cpus();

    const cpumodel = cpus[0].model;

    const ostype = os.type;

    const cpuarch = os.arch;

    const cpuclock = cpus[0].speed;

    const hostname = os.hostname;

    const date_ob = new Date();

    const date = ("0" + date_ob.getDate()).slice(-2);

    // current month

    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year

    const year = date_ob.getFullYear();

    // current hours

    const hours = date_ob.getHours();

    // current minutes

    const _minutes = date_ob.getMinutes();

    const minutes = _minutes.toString().length == 0 ? "0" + _minutes.toString() : _minutes;

    // current seconds

    const seconds = date_ob.getSeconds();

    const finishedproduct = tosetup
        .replace(/'DY'/g, `${year}`)
        .replace(/'DD'/g, `${date}`)
        .replace(/'DM'/g, `${month}`)
        .replace(/'DH'/g, `${hours}`)
        .replace(/'DMI'/g, `${minutes}`)
        .replace(/'DS'/g, `${seconds}`)
        .replace(/'N'/g, "\n")
        .replace(/'FM'/g, `${freememgb}`)
        .replace(/'AM'/g, `${totalmemgb}`)
        .replace(/'CPUM'/g, cpumodel)
        .replace(/'OSTYPE'/g, ostype)
        .replace(/'CPUARCH'/g, cpuarch)
        .replace(/'CPUCLOCK'/g, `${cpuclock}`)
        .replace(/'U'/g, username || "unknown")
        .replace(/'HN'/g, hostname);

    return finishedproduct;
}