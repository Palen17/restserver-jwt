const { Router } = require('express');
const { check } = require('express-validator');
const {login} = require("../controllers/auth");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router()

router.post('/login', [
    check('correo', 'el correo es obiligatorio').isEmail(),
    validarCampos
],login);

module.exports = router