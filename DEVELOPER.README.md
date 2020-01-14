# Creston CH5 Remote Logger - Developer Readme

## 1. Prerequisites:
- Docker > 2.0.0 - if you are using Docker on a Windows machine, make sure to use **Linux containers**
- npm >= 6.4.1
- yarn >= 1.17.3
- node >= 8
- recommended: Use [Kitematic](https://kitematic.com/)

## 2. Build and test locally without docker

Use the following shortcuts:

1. `yarn build-all`
2. `yarn start` - API
3. `yarn start-app` - web

## 3. Building the docker images:
Run the following command based on the desired environment, currently there are dev and prod environments available
- Build the docker image for development: `docker build . -t ch5-remote-logger:dev -f ./env/dev/Dockerfile`
- Build the docker image for production: `docker build . -t ch5-remote-logger:latest -f ./env/prod/Dockerfile`

## 4. Up and running:
To create the docker container within the remote-logger run:
- Dev: ``` docker run -p {8080}:80 ch5-remote-logger:dev```
- Production: ```docker run -p {8080}:80 ch5-remote-logger:latest ```

Now you should have an up and running container found at: http://127.0.0.1:8080

## 5. Docker image distribution without using a hub service:

### Distributor tasks:
- create the docker image build for production `docker build . -t ch5-remote-logger:latest -f ./env/prod/Dockerfile`
- save the docker image locally `docker save -o ./ch5-remote-logger.tar ch5-remote-logger:latest`
- send the `ch5-remote-logger.tar` file

### Receiver tasks:
- load `ch5-remote-logger.tar` into docker using: `docker load -i ch5-remote-logger.tar`
- do the step from chapter [3. Up and Running](#3-up-and-running)

## 6. Code snippets for integration

Unit tests are available, use `yarn test` to run them, in addition, some quickstart code snippets are provided below.
Adjust the IP and port as needed.
### 6.1. Vanilla JS

 ```
const appender = CrComLib.getRemoteAppender('localhost', '8080'); // RemoteLogger API
const logger = CrComLib.getLogger(appender, true);
window.logger = logger; // attach to window so you can test in the browser
const msg = 'app-ch5-video';

logger.error(msg);
logger.warn(msg);
logger.info(msg);
logger.log(msg);
```

### 6.2. Angular with ch5-buttons

```
declare var CrComLib;

logger: any;

constructor(private elem: ElementRef) {
 const appender = CrComLib.getRemoteAppender('localhost', '8080');
 this.logger = CrComLib.getLogger(appender, true);

}

sendErrorOnClick() {
 this.logger.error('ERROR');
}

sendWarnOnClick() {
 this.logger.warn('WARNING');
}

sendInfoOnClick() {
 this.logger.info('INFO');
}

sendLogOnClick() {
 this.logger.log('LOG');
}

...

<div>
 <ch5-button (click)="sendErrorOnClick()" type="danger" label="ERROR"></ch5-button>
 <ch5-button (click)="sendWarnOnClick()" type="warning" label="WARNING"></ch5-button>
 <ch5-button (click)="sendInfoOnClick()" type="info" label="INFO"></ch5-button>
 <ch5-button (click)="sendLogOnClick()" type="text" label="LOG"></ch5-button>
</div>

```
