# Creston CH5 Remote Logger - Developer Readme

## Test snippets for the docker build

 ```
 const appender = CrComLib.getRemoteAppender('localhost', '80'); // RemoteLogger API
    const logger = CrComLib.getLogger(appender, true);
    window.logger = logger; // attach to window so you can test in the browser
    const msg = 'app-ch5-video';

    logger.error(msg);
    logger.warn(msg);
    logger.info(msg);
    logger.log(msg);
```

## Test snippet - Angular 

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
