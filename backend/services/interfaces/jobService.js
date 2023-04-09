const Service = require('./service');
const job = require('../../models/inputModels/documentCV');
const jobRepository = require('../../repositories/jobRepository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng UserRepository
        super();
        this.jobRepository = jobRepository;
        this.job = job;
    }

    // Function implement
    async IfindById(id) {
        return jobRepository.RfindById(id);
    }
    async Ifind() {
        return jobRepository.Rfind();
    }
    async IfindOne(req) {
        return jobRepository.RfindOne(req);
    }
    async IinsertOne(req) {
        return jobRepository.RinsertOne(req);
    }
    async IdeleteOne(id) {
        return jobRepository.RdeleteOne(id);
    }
    async IupdateOne(id, req) {
        return jobRepository.RupdateOne(id, req);
    }
}