<p align="center">
  <img src="https://kenticoprod.azureedge.net/kenticoblob/crestron/media/crestron/generalsiteimages/crestron-logo.png">
</p>
 
# CH5 Remote Logger - Getting Started

#### Continuous Integration and Deployment Status

| DEV NIGHTLY - latest-dev | Status |
| ------ | ----------- |
| Build Pipeline | ![Build status](https://dev.azure.com/crestron-mobile-devops/MobileApps/_apis/build/status/Blackbird/CoreBuild/CH5RemoteLogger?branchName=dev) |
| Release Pipeline | ![Build status](https://vsrm.dev.azure.com/crestron-mobile-devops/_apis/public/Release/badge/0403b700-ab40-43cd-9990-961924c561bc/39/95) |

| MASTER-QE - latest-qe | Status |
| ------ | ----------- |
| Build Pipeline | ![Build status](https://dev.azure.com/crestron-mobile-devops/MobileApps/_apis/build/status/Blackbird/CoreBuild/CH5RemoteLogger?branchName=master) |
| Release Pipeline | ![Build status](https://vsrm.dev.azure.com/crestron-mobile-devops/_apis/public/Release/badge/0403b700-ab40-43cd-9990-961924c561bc/39/97) |

## 1. Introduction:
Integrators do not have the ability to use the Browser Dev Tools on the CH5 container applications on x60 and iOS. As such they have little insight into error messages or diagnostic console log messages that would be displayed in the console of these tools.

## 2. Prerequisites:
- Docker > 2.0.0 - if you are using Docker on a Windows machine, make sure to use **Linux containers**
- npm >= 6.4.1
- yarn >= 1.17.3
- node >= 8

## 3. Runinng the container:
Remove brackets and if needed replace use a different PORT.
```bash
docker run -p {8080}:80 ch5-remote-logger
```
This command create the container where the logs will be appended. You can check the containers running the following command: `docker ps`

## 4. Api endpoints:
- GET `/configuration` used to pull the filter configuration
- POST `/configuration` used to update the filter configuration
- POST `/log` used to add logs
- GET `/` is serving a HTML page for filter configuration 

## 5. Integration with a ch5 project:
Two steps to integrate with ch5-remote-logger:
```javascript
const appender = CrComLib.getRemoteAppender('{HOST}', '{PORT}');
const logger = CrComLib.getLogger(appender, true);
```
### Also you can specify a filter configuration:
```javascript
const appender = CrComLib.getRemoteAppender('{HOST}', '{PORT}');
const filterConfiguration = new CrComLib.LogMessagesFilter(2, 'Ch5SignalBridge.publish', 'send_event_on_tap');
const logger = CrComLib.getLogger(appender, true, filterConfiguration);
```

NOTE: On development, replace `{HOST}` with `localhost` and `{PORT}` with `8080`

## 6. Logger interface:
Hosted on `http://127.0.0.1:{8080}`. Use this interface to change the filter and check the log messages within a web interface. 
