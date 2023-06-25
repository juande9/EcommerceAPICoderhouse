const authorization = (permission) => {
  return async (req, res, next) => {
    const { isAdmin, role } = req.user;

    const isAuthorized = isAdmin || (role && role.permissions && role.permissions.includes(permission));

    if (!isAuthorized) {
      return res.status(403).send({ message: 'Authorization error' });
    }

    next();
  };
};

export default authorization;