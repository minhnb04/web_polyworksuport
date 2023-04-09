const Service = require('../../services/interfaces/service');
const userJob = require('../../models/inputModels/user_job');
const userJobRepository = require('../../repositories/userJobRepository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng UserRepository
        super();
        this.userJobRepository = userJobRepository;
        this.userJob = userJob;
    }

    // Function implement
    async IfindById(id) {
        return userJobRepository.RfindById(id);
    }
    async Ifind() {
        return userJobRepository.Rfind();
    }
    async IfindOne(req) {
        return userJobRepository.RfindOne(req);
    }
    async IinsertOne(req) {
        return userJobRepository.RinsertOne(req);
    }
    async IdeleteOne(id) {
        return userJobRepository.RdeleteOne(id);
    }
    async IupdateOne(id, req) {
        return userJobRepository.RupdateOne(id, req);
    }
}