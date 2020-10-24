/*
* 仅仅是在前端做一个模拟登录的功能
* 它是不安全的
*/

import AESEncryption from "aes-crypto";// npm i aes-crypto
const _encryption = new AESEncryption();

//前端登录模拟
let _username = "admin";
let _password = "password";
let _keyContent =
  "FB32D61111CBE2D012E7A12209322CF5FB32D671D6CBE2D012E7A12209322CF5";
let _interval = 10 * 60 * 1000;// token过期时间

// 登录
let login = (username, password) => {
  if (username === _username && password === _password) {
    setCookie();
    return true;
  } else {
    return false;
  }
};
// 加密存储token到cookie
let setCookie = () => {
  const encryStr = _encryption.encryption(
    JSON.stringify({
      _username: _username,
      _password: _password,
      date: new Date().getTime(),
    }),
    _keyContent
  );
  document.cookie = `token=${encryStr}`;
};

/*
* 验证登录状态
* 可以用来在页面跳转的时候做验证
* 验证成功时会重置token过期时间
*/
let validation = () => {
  let cookie = document.cookie;

  if (!cookie) {
    //没有cookie
    return false;
  }

  let cookieToken = cookie.split(";").find((item) => {
    let arr = item.split("=");
    if (arr[0] === "token") {
      return true;
    } else {
      return false;
    }
  });

  if (cookieToken) {
    try {
      let TokenData = JSON.parse(
        _encryption.decryption(cookieToken.split("=")[1], _keyContent)
      );
      if (
        TokenData._username === _username &&
        TokenData._password === _password &&
        TokenData.date + _interval > new Date().getTime()
      ) {
        setCookie();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //如果token被用户手动修改后解密会失败
      uplogin();
      return false;
    }
  } else {
    //cookie中没有token
    return false;
  }
};

// 退出登录
let uplogin = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export {
  login,
  validation,
  uplogin,
}