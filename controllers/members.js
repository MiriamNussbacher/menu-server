const service = require('../services/members')
module.exports = {
    getMemberById: function (req, res, next) {
        try {

            const memberId = parseInt(req.params.id);
            const hirarchy = service.getHierarchy(memberId)
            if (hirarchy) {
                res.json(hirarchy);
            } else {
                res.status(400).send('Bad Request: Member id is not valid');
            }
        } catch (error) {
            next(error);
        }
    },

    getAll: function (req, res, next) {
        try {
            const members = service.getAllMembers();
            res.json(members)
        } catch (error) {
            next(error);
        }
    }


}


