const Service = require('../../services/interfaces/service');
const user = require('../../models/inputModels/user');
const userRepository = require('../../repositories/userRepository');

module.exports = new class extends Service {
    constructor() {
        // Gọi lại tầng UserRepository
        super();
        this.userRepository = userRepository;
        this.user = user;
    }

    // Function implement
    async IfindById(id) {
        return userRepository.RfindById(id);
    }
    async Ifind() {
        return userRepository.Rfind();
    }
    async ILogin(req) {
        return userRepository.RfindOne(req);
    }
    async IfindOne(req) {
        return userRepository.RfindOne(req);
    }
    async IRegister(req) {
        return userRepository.RinsertOne(req);
    }
    async IdeleteOne(id) {
        return userRepository.RdeleteOne(id);
    }
    async IupdateOne(id, req) {
        return userRepository.RupdateOne(id, req);
    }
}