module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('short_url', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      url: { type: DataTypes.TEXT, allowNul: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    })
    .complete(done)
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('short_url').complete(done)
  }
}
