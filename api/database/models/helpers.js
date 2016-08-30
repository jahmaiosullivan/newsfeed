import DataType from 'sequelize';

const createdUpdated = {
  attributes: {
    createdBy: DataType.UUID,
    createdAt: DataType.DATE,
    updatedBy: DataType.UUID,
    updatedAt: DataType.DATE
  },
  options: {
    hooks: {
      beforeValidate: function (instance, cb) {
        console.log( 'Validating!!!' );
        cb();
      }
    }
  }
};

export { createdUpdated }
