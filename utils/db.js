const db = wx.cloud.database({
  env: 'cloud1-4gs6ldi71bcdcfef'
})
const _ = db.command
export {db,_} 