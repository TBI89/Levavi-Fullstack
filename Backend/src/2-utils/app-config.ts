
// Base class:
class AppConfig {
    public readonly port = process.env.PORT;
    public readonly mysqlHost = process.env.MY_SQL_HOST;
    public readonly mysqlUser = process.env.MY_SQL_USER;
    public readonly mysqlPassword = process.env.MY_SQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MY_SQL_DATABASE;
    public readonly origin = process.env.ORIGIN
}

// Inherited classes:
class DevelopmentAppConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionAppConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}


const appConfig = (process.env.NODE_ENV === "production")? new ProductionAppConfig() : new DevelopmentAppConfig();

export default appConfig;