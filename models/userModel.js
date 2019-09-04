/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Users', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'userName'
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'password'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'createdAt'
		},
		status: {
			type: DataTypes.INTEGER(20),
			allowNull: false,
			field: 'status'
		},
		channel: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'channel'
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: true,
			field: 'phone'
		},
		fullName: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'fullName'
		},
		avatar: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'avatar'
		},
		gender: {
			type: DataTypes.INTEGER(255),
			allowNull: true,
			field: 'gender'
		},
		socialId: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'socialId'
		},
		groupId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'groupId'
		},
		totalFriend: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'total_friend'
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'birthday'
		},
		modifiedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'modifiedAt'
		},
		userChanged: {
			type: DataTypes.INTEGER(20),
			allowNull: true,
			field: 'userChanged'
		},
		parentId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'parentId'
		}
	}, {
		tableName: 'Users',
		timestamps: false
	});
};
