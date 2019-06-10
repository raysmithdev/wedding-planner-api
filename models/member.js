const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
  name: {type: String, default: ''},
  avatar: {type: String, default: ''},
  formats: [],
  status: {type: String, default: ''},
  performance: {type: String, default: ''},
  notes: []
})

const Member = mongoose.model('Member', MemberSchema);

module.exports = { Member, MemberSchema }
