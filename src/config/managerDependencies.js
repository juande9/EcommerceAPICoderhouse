import dotenv from 'dotenv'
dotenv.config()

const pattern = process.env.DB_PATTERN;

let managerDependencies = {};

if (pattern === 'Dao') {
  managerDependencies = {
    cartManager: "CartDao",
    productManager: "ProductDao",
    roleManager: "RoleDao",
    usersManager: "UsersDao"
  };
} else if (pattern === 'Repository') {
  managerDependencies = {
    cartManager: "CartRepository",
    productManager: "ProductRepository",
    roleManager: "RoleRepository",
    usersManager: "UsersRepository"
  };
}

export { managerDependencies };

