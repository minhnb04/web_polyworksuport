const CronJob = require('./cronjob');

module.exports = new class extends CronJob {
    constructor() {
        super();
        this.cron =   cron(1000, () => {
            console.log('Hello Anonystick');
        });
    }

    getSchedule() {
        return this.cron;
    }
}

function cron(ms, fn) {
    function cb() {
        clearTimeout(timeout)
        timeout = setTimeout(cb, ms)
        fn()
    }
    let timeout = setTimeout(cb, ms)
}
