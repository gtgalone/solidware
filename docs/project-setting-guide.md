# Lunch-app 개발환경

## Develop

**개발환경**
* node.js 8
* git - github
* visual studio code

**deploy**
* docker

## backend
* router
* business
* model

## frontend
* webpack
* gulp
* material-ui
* es6 / eslint
* react / redux

## library

**deploy**
* bulebird => promise의 확장 라이브러리
* body-parser => express에서 request의 body를 얻기위한 라이브러리
* es6-promise => es6 promise의 폴리필 라이브러리
* express => nodejs 의 웹서버 프레임웨크
* immutability-helper => react내에 불변객체에 대한 변경을 도와주는 라이브러리
* isomorphic-fetch => fetch api를 사용할 수 있게 해주는 라이브러리
* jss, * => javascript를 css로 컴파일해주는 라이브러리 (서버사이드 포함)
* material-ui, * => material-ui 컴포넌트를 사용할 수 있게 해주는 라이브러리
* mongoose => MongoDB의 ODM
* nprogress => 비동기 통신에 대한 로딩을 표시해주는 라이브러리
* prop-types => react에서 propTypes를 선언 해주기 위한 라이브러리
* react, * => react를 사용하기 위한 라이브러리
* react-helmet => 페이지 별 메타태그와 타이틀 삽입을 도와주는 라이브러리
* react-redux => react에서 redux를 사용하기 위한 라이브러리
* redux-form => redux 패턴에서 form을 쉽게 사용할 수 있게 해주는 라이브러리
* react-router-dom => react의 라우팅을 도와주는 라이브러리
* redux-logger => 리덕스의 흐름을 로그로 나타내주는 라이브러리
* redux-thunk => redux의 비동기 통신을 도와주는 라이브러리
* serialize-javascript => 객체를 JSON화 시켜주고 XSS공격을 방지해주는 라이브러리

**dev**
* babel, * => es6, es7, react 등을 commonjs로 바꿔주는 라이브러리
* browser-sync => 개발환경에서 소스 수정시 자동으로 브라우저를 새로고침해주는 라이브러리
* eslint, * => 문법교정 라이브러리
* gulp, * => 빌드 자동화 툴
* html-webpack-plugin => html파일 수정을 도와주는 웹팩 플러그인
* webpack => 소스 번들 라이브러리

## Gulp Task

* webpack:build
 => 배포용 빌드
* webpack:build-dev
 => 개발용 빌드
* browser-sync
 => 개발용 브라우저 갱신 라이브리러 (browser-sync)
* nodemon
 => 빌드 후 개발용 서버 구동 라이브러리 (nodemon)
* default
 => 빌드 후 개발용 서버 구동 후 소스 변환 시 다시 빌드하고 서버 구동

 ## Docker-compose Services

* lunch-app
 => node js 기반 서버 구동용 Docker 이미지를 mongo 컨테이너와 연결 후 3000 포트로 띄움
* mongo
 => mongoDB 이미지를 27017 포트로 띄움