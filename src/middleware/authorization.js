const authorization = (permission) => {
    return async (req, res, next) => {
      const user = req.user;
  
      if (!user.isAdmin || !user.role.permissions || !user.role.permissions.includes(permission)) {
        return res.status(403).send({ message: 'Authorization error' });
      }
  
      next();
    };
  };
  
  export default authorization;