import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ createdAt: false, updatedAt: false })
export class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  role_id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  role_name: string;
}
