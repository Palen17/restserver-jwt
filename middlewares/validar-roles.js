const {response} = require('express')

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'No posee los permisos para realizar esta accion'
        })
    }

    next();
}


const tieneRole = (...roles) => {


        return(req, res = response, next) =>{

            if(!req.usuario){
                return res.status(500).json({
                    msg: 'Se quiere verificar el role sin validar el token primero'
                })
            }

            if(!roles.includes(req.usuario.rol)){
                return res.status(401).json({
                    msg: 'Rol no valido'
                })
            }

            next()
        }

}

module.exports = {
    esAdminRole,
    tieneRole
}