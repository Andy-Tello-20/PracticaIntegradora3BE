export const authRolesMiddleware = (req, res, next) => {
    if(!req.user) {
      return res.status(401).json({ message: 'Desautorizado' });
    }
    const { role : userRole } = req.user;
  
    if (userRole !== "admin") {
      
      return res.status(403).render('error', { title: 'NoPermission', messageError: 'No tienes permiso para realizar esta operación' });
    }
    next();
  };