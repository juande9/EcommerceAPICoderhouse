export const newSessionPublic = (req, res) => {
    try {
        if (!req.session?.counter) {
            req.session.counter = 1
            return res.send("Bienvenido")
        }
        req.session.counter++;
        res.send(`Se ha iniciado con exito ${req.session.counter} veces`)

    }
    catch (e) {
        res.status(400).send({ status: "error", message: "No se genero la sesion" });
    }
}


export const newSessionPrivate = (req, res) => {
    try {
        if (!req.session?.counter) {
            req.session.counter = 1;
            return res.send({ message: 'Bienvenido!' });
        }

        req.session.counter++;
        res.send({ message: `Se ha visitado el sitio ${req.session.counter} veces.` });

    }
    catch (e) {
        res.status(400).send({ status: "error", message: "No se genero la sesion" });
    }
}

export const login = (req, res) => {
    try {
        const { username, password } = req.body

        if (username !== "pepe" || password !== "123456") {
            res.status(400).send({ status: "error", message: "Error en el Log in" });
        }

        req.session.user = username
        req.session.admin = true

        res.status(201).send({ status: "success", message: "Logueado" });

    }
    catch (e) {
        res.status(400).send({ status: "error", message: "No se genero la sesion" });
    }
}

export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (!err) {
                res.status(201).send({ status: "success", message: "Log Out Ok" });
            }
        })

    }
    catch (e) {
        res.status(400).send({ status: "error", message: "Log out error" });
    }
} 