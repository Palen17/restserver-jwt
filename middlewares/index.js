

const  validarJWt  = require('../middlewares/validar-jwt');
const  validarCampos  = require('../middlewares/validar-campos');
const tieneRole = require("../middlewares/validar-roles");

module.exports = {
    ...tieneRole,
    ...validarCampos,
    ...validarJWt
}