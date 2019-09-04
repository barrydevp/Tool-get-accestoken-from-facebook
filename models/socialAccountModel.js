/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sclSocialAccounts', {
		saId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'Sa_ID'
		},
		saUserName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'Sa_UserName'
		},
		saEmail: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'Sa_Email'
		},
		saMobile: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'Sa_Mobile'
		},
		saUserIdCreate: {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'Sa_UserIdCreate'
		},
		saUserIdManage: {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'Sa_UserIDManage'
		},
		saStatus: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Sa_Status'
		},
		saToken: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'Sa_Token'
		},
		saCreateDate: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'Sa_CreateDate'
		},
		saSocialId: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Sa_SocialID'
		},
		saAvatar: {
			type: DataTypes.STRING(5000),
			allowNull: true,
			field: 'Sa_Avatar'
		},
		saGroupSocialId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'Sa_GroupSocialID'
		},
		saTokenExpired: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Sa_TokenExpired'
		},
		saTokenExpiredDescription: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Sa_TokenExpiredDescription'
		},
		saSyncDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Sa_SyncDate'
		},
		saGender: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'Sa_Gender'
		},
		saLink: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Sa_Link'
        },
        saPassword: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Sa_Password'
        },
        saLoginName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Sa_LoginName'
		},
	}, {
		tableName: 'Scl_SocialAccounts',
		timestamps: false
	});
};
