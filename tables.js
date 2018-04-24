var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

module.exports = function(connection) {

    //TODO: create new entity to save unused lists

    var Customer = connection.define('Customer', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: Sequelize.STRING,
        cpf: Sequelize.STRING,
        address: Sequelize.STRING
    });

    var List = connection.define('List', {
        name: Sequelize.STRING,
        status: Sequelize.INTEGER
    });

    var Employee = connection.define('Employee', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
        cpf: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        funcao: Sequelize.STRING
    });


    // //change metric to content
    var Product = connection.define('Product', {
        id:{
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement:true
        },
        name: Sequelize.STRING,
        brand: Sequelize.STRING,
        photo: Sequelize.STRING, //photo adress on net
        packing: Sequelize.STRING,
        metric_value: Sequelize.STRING,
        metric_type : Sequelize.STRING
    });

    var Category = connection.define('Category',{
        name: Sequelize.STRING
    });

    var Supermarket = connection.define('Supermarket', {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        phone: Sequelize.STRING,
        banner: Sequelize.STRING    
    });

    var SupermarketProduct = connection.define('SupermarketProduct', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        availability: Sequelize.BOOLEAN,
        price: Sequelize.FLOAT,
        date: Sequelize.DATE
    });

    var Shopcart = connection.define('Shopcart', {
        qtd: Sequelize.INTEGER
    });

    var ListProduct = connection.define('ListProduct',{
        qtd: Sequelize.INTEGER
    });

    var Purchase = connection.define('Purchase',{
        id_pai: Sequelize.INTEGER,
        status: Sequelize.INTEGER,
        total_price: Sequelize.STRING,
        date: Sequelize.DATE
    });

    var Receipt = connection.define('Receipt');
    var ReceiptCustomer = connection.define('ReceiptCustomer');

    //cardinalidades
    Customer.belongsToMany(List, {
        through: "CustomerList",
        foreignKey: 'CustomerId'
    });

    List.belongsToMany(Customer, {
        through: "CustomerList",
        foreignKey: 'ListId' 
    });

    List.belongsToMany(Product, {
        through: 'ListProduct',
        foreignKey: 'ListId' 
    });

    Product.belongsToMany(List, {
        through: 'ListProduct',
        foreignKey: 'ProductId'
    });

    Category.belongsToMany(Product, {
        through: 'ProductCategory',
        foreignKey: 'CategoryId' 
    });

    Product.belongsToMany(Category, {
        through: 'ProductCategory',
        foreignKey: 'ProductId'
    });

    Supermarket.belongsToMany(Product, {
        through: 'SupermarketProduct',
        foreignKey: 'SupermarketId'
    });

    Product.belongsToMany(Supermarket, {
        through: 'SupermarketProduct',
        foreignKey: 'ProductId'
    });

    Supermarket.belongsToMany(Employee, {
        through: 'SupermarketEmployee',
        foreignKey: 'SupermarketId'
    });

    Employee.belongsToMany(Supermarket, {
        through: 'SupermarketEmployee',
        foreignKey: 'EmployeeId'
    });

    Purchase.belongsToMany(SupermarketProduct, {
        through: "Shopcart",
        foreignKey: "PurchaseId"
    });

    SupermarketProduct.belongsToMany(Purchase, {
        through: "Shopcart",
        foreignKey: "SupermarketProductId"
    });

    Employee.hasMany(Receipt, {
        as: "EmployeeReceiver",
        foreignKey: "EmployeeReceiverCpf"
    });

    Employee.hasMany(Receipt, {
        as: "EmployeeSender",
        foreignKey: "EmployeeSenderCpf"
    });

    Purchase.hasMany(Receipt)
    Receipt.belongsTo(Purchase)
    Receipt.belongsTo(Employee, {
        as: "EmployeeReceiver"
    });
    Receipt.belongsTo(Employee, {
        as: "EmployeeSender"
    });

    Customer.hasMany(ReceiptCustomer);
    ReceiptCustomer.belongsTo(Customer);
    Employee.hasMany(ReceiptCustomer);
    ReceiptCustomer.belongsTo(Employee);
    Purchase.hasMany(ReceiptCustomer);
    ReceiptCustomer.belongsTo(Purchase);
    

    connection.sync(); // create tables if dont exist

    var tables = {
        Customer,
        List,
        connection
    };
    return tables;
}
