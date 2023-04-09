const Service = require('./service');
const documentCV = require('../../models/inputModels/documentCV');
const documentCVRepository = require('../../repositories/documentCVRepository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng UserRepository
        super();
        this.documentCVRepository = documentCVRepository;
        this.documentCV = documentCV;
    }

    // Function implement
    async IfindById(id) {
        return documentCVRepository.RfindById(id);
    }
    async Ifind() {
        return documentCVRepository.Rfind();
    }
    async IfindMany(req) {
        return documentCVRepository.RfindMany(req);
    }
    async IfindOne(req) {
        return documentCVRepository.RfindOne(req);
    }
    async IinsertOne(req) {
        return documentCVRepository.RinsertOne(req);
    }
    async IdeleteOne(id) {
        return documentCVRepository.RdeleteOne(id);
    }
    async IupdateOne(id, req) {
        return documentCVRepository.RupdateOne(id, req);
    }
}