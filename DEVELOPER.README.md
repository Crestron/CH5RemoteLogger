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

## 2.1. Building the docker images

See Step 4 in [Main README](README.md)

## 3. Test locally

Unit tests are available, use `yarn test` to run them, in addition, some helpful code snippets is provided below.
Adjust the IP and port as needed.
### 3.1. Test snippets for the docker build

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

### 3.2. Test snippet - Angular 

```
// TS
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

// HTML
<div>
 <ch5-button (click)="sendErrorOnClick()" type="danger" label="ERROR"></ch5-button>
 <ch5-button (click)="sendWarnOnClick()" type="warning" label="WARNING"></ch5-button>
 <ch5-button (click)="sendInfoOnClick()" type="info" label="INFO"></ch5-button>
 <ch5-button (click)="sendLogOnClick()" type="text" label="LOG"></ch5-button>
</div>

```
