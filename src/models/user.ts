import * as Sequelize from 'sequelize';

import { sequelize } from './';

export const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    platform: { type: Sequelize.STRING },
    vendor: { type: Sequelize.STRING },
    product: { type: Sequelize.STRING },
    ip: { type: Sequelize.STRING },
    countryCode: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

// user.associate = function(models) {
//   models.user.hasMany(models.comment, { foreignKey: "user_id", sourceKey: "id" });
// }

export default User;
