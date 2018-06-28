import * as Sequelize from 'sequelize';

import { sequelize } from './';

interface UserAttributes {
  id: string;
  platform?: string;
  vendor?: string;
  product?: string;
  ip?: string;
  countryCode?: string;
  city?: string;
}

export type UserModel = Sequelize.Instance<UserAttributes> & UserAttributes;

export const User = sequelize.define<UserModel, UserAttributes>(
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
