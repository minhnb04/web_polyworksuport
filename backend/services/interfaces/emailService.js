const stmp = require('../../configs/stmp');
const Mailer = require('../../commons/email/mailer');

module.exports = new class extends Mailer{
    constructor() {
        super();
        this.stmp = stmp;
    }

    // Function implement
    async getEmailInfo() {
        return stmp.getEmailInfo();
    }

    async sendEmail(to, subject, text) {
        return stmp.sendEmail(to, subject, text);
    }
}