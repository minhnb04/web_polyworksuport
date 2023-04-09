const Service = require('../../services/interfaces/service');
const role = require('../../models/inputModels/role');
const roleRepository = require('../../repositories/roleRepository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng UserRepository
        super();
        this.roleRepository = roleRepository;
        this.role = role;
    }

    // Function implement
    async IfindById(id) {
        return roleRepository.RfindById(id);
    }
    async Ifind() {
        return roleRepository.Rfind();
    }
    async IfindOne(req) {
        return roleRepository.RfindOne(req);
    }
    async IinsertOne(req) {
        return roleRepository.RinsertOne(req);
    }
    async IdeleteOne(id) {
        return roleRepository.RdeleteOne(id);
    }
    async IupdateOne(id, req) {
        return roleRepository.RupdateOne(id, req);
    }
}