const checkDomain = (req, res, next) => {
    const protocol = req.protocol; // http o https
    const domain = req.get('host'); // Dominio, incluyendo puerto si lo hay

    // Puedes personalizar cómo obtienes el dominio según tus necesidades
    const customDomain = `${protocol}://${domain}`;

    req.customDomain = customDomain; // Lo añadimos a la solicitud para su posterior uso
    next();
};

export default checkDomain;