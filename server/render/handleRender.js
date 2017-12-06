const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const render = require('../../dist/server.js').default; // ES6 형식으로 만들어진 모듈이므로, 뒤에 .default 를 붙여주어야합니다.
// html 내용을 해당 상수에 저장합니다
const template = fs.readFileSync(path.join(__dirname, '../../src/index.html'), { encoding: 'utf8' });

const handleRender = (req, res) => {
  // 요청이 들어올 때 현재 경로를 render 함수에 전달시켜서 문자열을 생성합니다
  const location = req.url;
  const { html, css, state, helmet } = render(location);
  // html 을 넣어주고, state 를 window.__PRELOADED_STATE__ 값으로 설정
  // tslint:disable-next-line:max-line-length
  const page = template
    .replace('<meta helmet>', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__PRELOADED_STATE__=${serialize(state)}</script>`)
    .replace('<style id="jss-server-side"></style>', `<style id="jss-server-side">${css}</style>`);
  res.send(page);
};

module.exports = handleRender;
