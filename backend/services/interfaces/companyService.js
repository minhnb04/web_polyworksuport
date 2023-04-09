const Service = require('../../services/interfaces/service');
const company = require('../../models/inputModels/company');
const companyRepository = require('../../repositories/companyRepository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng UserRepository
        super();
        this.companyRepository = companyRepository;
        this.company = company;
    }

    // Function implement
    async IfindById(id) {
        return companyRepository.RfindById(id);
    }
    async Ifind() {
        return companyRepository.Rfind();
    }
    async IfindOne(req) {
        return companyRepository.RfindOne(req);
    }
    async IinsertOne(req) {
        return companyRepository.RinsertOne(req);
    }
    async IdeleteOne(id) {
        return companyRepository.RdeleteOne(id);
    }
    async IupdateOne(id, req) {
        return companyRepository.RupdateOne(id, req);
    }
}