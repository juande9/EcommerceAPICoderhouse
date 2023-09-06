const checkDomain = (req, res, next) => {
    const protocol = req.protocol;
    const domain = req.get('host');

    const customDomain = `${protocol}://${domain}`;

    req.domain = customDomain
    next();
};

export default checkDomain;