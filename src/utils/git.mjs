/* eslint-disable no-constant-condition */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

// 获取git提交的历史记录
const log = await $`git log -a`;
const authors = [];
const reg = /Author\:\s*(.*?)\s*</g;
while (true) {
  if (reg.test(log)) {
    if (authors.indexOf(RegExp.$1) === -1) authors.push(RegExp.$1);
  } else {
    break;
  }
}
