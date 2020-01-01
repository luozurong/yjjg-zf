import request from './axios.js'

/**
 * 微信jssdk验证
 */
export function wxGzhAuth(query) {
  var httpURL = "/dsas/wxGzh/wxGzhAuth?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 登录
 */
export function userLogin(query) {
  var httpURL = "/dsas/servlet/userLogin?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取疾病预警药店信息
 */
export function getSicknessWarnList(query) {
  var httpURL = "/dsas/servlet/getSicknessWarnList?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取违禁预警药店信息
 */
export function getContrabandWarnList(query) {
  var httpURL = "/dsas/servlet/getContrabandWarnList?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取违规预警药店信息
 */
export function getViolationWarnList(query) {
  var httpURL = "/dsas/servlet/getViolationWarnList?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 处理违禁违规预警药店信息
 */
export function updateWarnServlet(query) {
  var httpURL = "/dsas/servlet/updateWarnServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取指定药店信息及处方列表信息
 */
export function getPrescriptionOrderList(query) {
  var httpURL = "/dsas/servlet/getPrescriptionOrderList?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取处方签信息
 */
export function getPrescriptionSignatureInfo(query) {
  var httpURL = "/dsas/servlet/getPrescriptionSignatureInfo?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}