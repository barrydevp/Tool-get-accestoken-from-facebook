import { Sequelize } from 'sequelize';
import { sequelize } from '../db.js';

const models = {}

const modules = [
  require('./userModel'),
  require('./socialAccountModel'),
];

// Initialize models
modules.forEach(module => {
  const model = module(sequelize, Sequelize);

  console.log("model name ", model.name)
  models[model.name] = model;
});

models.Sequelize = Sequelize;

export default models;
