# Project Basic

Solidware 코딩테스트를 위한 Lunch-app 프로젝트입니다.

## Getting started

1. Install Nodejs

    [https://nodejs.org](https://nodejs.org) 에서 v8.x.x 버전을 설치

2. Install Docker

    [https://www.docker.com/](https://www.docker.com/) 에서 cc 버전을 설치

3. 프로젝트를 다운(또는 clone)받고 다음 명령어를 입력

    ```
    $ cd {project directory} # cd C:\Workspace\solidware
    $ npm install
    ```

    보통 최초 한번만 실행하면 되지만, 패키지가 업데이트 되었을때는 `npm install` 명령어를 다시 실행함

4. 프로젝트 시작하기

    ```
    $ docker-compose up 또는 sudo docker-compose up
    ```

5. 웹 브라우져 접속

    ```
    http://localhost:3000
    ```

## 디렉토리 가이드

```
|-- dist
|-- docs
|-- node_modules
|-- server
     |-- database
          |--business
          |--model
     |-- render
     |-- router
|-- shared
     |-- components
          |-- redux-form
     |-- redux
          |-- middleware
          |-- modules
          |-- store
|-- src
     |-- group
     |-- people
          |-- modal
     |-- redux
          |-- modules
          |-- reducers
          |-- store
```

**dist, node_modules(자동생성/수정금지)**

배포폴더, node 모듈

**docs**

- 참고 문서

**server**

- 백엔드 소스

**shared**

- 공통으로 사용 할 수 있는 재사용 가능한 커스텀 모듈

**src**

- 프론트엔드 소스

## 구현 방법

**backend**

1. nodejs를 이용하여 express로 웹서버를 구축하고 mongoDB를 mongoose ODM을 이용하여 연결하였습니다.

2. router를 통하여 들어오는 통신의 메소드를 구분하여 불러오기, 추가, 삭제 작업을 하였습니다.

3. handleRender를 이용하여 서버용으로 빌드된 src내의 server.jsx를 불러와서 react에서 제공하는 모듈로
   리액트 컴포넌트를 문자열로 바꾼 뒤 서버쪽의 데이터를 주입시키고 GET요청시 페이지를 응답해주는 서버사이드
   렌더링 방식을 이용하였습니다.

**frontend**

1. client.jsx를 이용하여 서버쪽과 같은 프론트엔드용 컴포넌트를 만들고 서버쪽에서는 server.jsx가 프론트엔드
   쪽에서는 client.jsx가 렌더링되는 방식입니다. 어떻게보면 시간차이로 덮어씌어진다는 표현이 맞을 수도 있습니다.

2. App.jsx 에서 프론트용 라우팅설정을 해주었습니다.

3. 리액트 리덕스패턴을 사용하여 하나의 스토어에 state들을 관리해주었고, 리덕스를 구현하는 방법에는 여러가지 방법이
   있지만 저 같은 경우 shared폴더내에 있는 redux모듈들을 사용하여 리듀서와 액션을 생성해주는 방식으로 하나하나
   따로 만들어주지 않아도 리듀서를 공통으로 한 파일내에서 만들어서 주입시켜주고, 액션은 필요한 컴포넌트 내에서
   해당 함수를 호출하여 만들어서 사용하는 방식입니다.

4. 하나의 페이지 내에 컴포넌트와 컨테이너를 나누는 방식에는 컴포넌트는 그림을 그려주는 역할을 하고 컨테이너는 스토어와
   데이터를 주고받아 컴포넌트로 넘겨주는 역할을 하고 있습니다.

5. src 폴더내에 있는 redux폴더는 프론트엔드용 액션명과, 공통리듀서, 스토어생성자를 담고 있습니다.