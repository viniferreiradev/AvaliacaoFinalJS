export function validateUserRegistration (req, res, next) {
    const {name, email, password} = req.body

    switch (name, email, password) {
        case!name:
            return res.status(400).json({message: 'Por favor, verifique se passou o nome'})
        case!email:
            return res.status(400).json({message: 'Por favor, verifique se passou o email'})
        case!password:
            return res.status(400).json({message: 'Por favor, verifique se passou o password'})
        default:
            break;
    }

    next()
}