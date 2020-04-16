const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  role: state => state.user.role,
  openId: state => state.user.openId,
  memberId: state => state.user.memberId,
  userId: state => state.user.userId,
  shopId: state => state.user.shopId,
  loginName: state => state.user.loginName
}
export default getters
