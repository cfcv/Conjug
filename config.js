//todo:verificar forma segura de colocar esses dados
var config = {
development: {
  url:'http://localhost:3000',
  database: {
      host: 'localhost',
      port: '3306',
      db: 'conjug',
      user: 'root',
      password: 'adminadmin',
      dialect: 'mysql',
      dialectOptions: {
          ssl: false
      }
  }
},

cfcv_dev: {
    url:'http://localhost:3000',
    database: {
        host: 'localhost',
        port: '3306',
        db: 'conjug',
        user: 'root',
        password: '1234',
        dialect: 'mysql',
        dialectOptions: {
            ssl: false
        }
    }
},
production: {
    url:'url de producao',
    database: {
        host: '',
        port: '',
        db: '',
        user: '',
        password: '',
        dialect: 'mysql',
        dialectOptions: {
            ssl: false
        }
    }
}
};

module.exports = function(env){
    console.log("CHEGUEIC "+env);
    console.log("CHEGUEIC "+String(env)=="development");
    if("development" === env){
        console.log("DE " + config.development.password);
        return config.development;
    }else if("production" === env){
        console.log("P " + config.production.password);
        return config.production;
    }else if("cfcv_dev" === env){
        console.log("C " + config.cfcv_dev.password);
        return config.cfcv_dev;
    }else {
        console.log("D " + config.development.password);
        return config.development;
    }
};
