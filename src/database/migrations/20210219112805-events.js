module.exports = {
  async up(db, client) {
    await db.collection('events').updateOne({name: 'SECIT'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    await db.collection('events').updateOne({name: 'SECIT'}, {$set: {blacklisted: false}});
  }
};
