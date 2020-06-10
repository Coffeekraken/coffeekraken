


<!-- @namespace    sugar.node.auth -->

# ```js SAuth ```


Base class that gives you the ability to set/ask for some authentification informations like auth token, username-password, etc...



## Example (js)

```js
const apiAuth = new SAuth('bitbucket');
const token = await apiAuth.ask('token');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Construct the SAuth instance

## Parameters

- **name**  String: The name of this SAuth instance

- **settings** ([object Object]) Object: 
An object of settings to configure this SAuth instance. Here's the list of available settings:
- type (basic) {String}: Specify the auth type wanted. Can be 'basic', 'bearer', 'oauth2', etc...
- title (null) {String}: Specify the title to display on top of the form
- info (null) {String}: Specify some info to display on top of the form
- adapter (SAuthTerminalAdapter) {SAuthAdapter}: The adapter instance you want to use to get the auth informations
- cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
- validator (null) {Function}: An async function that take as parameters the auth type like "basic" and the auth object to check if the authentification is correct. Has to return a promise that need to be resolved with true if all is ok, and false if not. Can be also an error message to display to the user




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js inject ```


This method take the passed requestConfig object and inject the auth parameters depending on the "injector" wanted that can be one of the described bellow

## Parameters

- **injector**  String,Function: The injector wanted that can be one of these:
- axios: Inject the auth infos into an axio request config object
- Function: A function that take as parameters the requestConfig object and the authInfo object and has to return the updated requestConfig
- **requestConfig**  Object: The request config object into which inject the auth info

- **authInfo** (this.authInfo) Object: The authInfo object to use



## Example (js)

```js
myAuth.inject('axios', requestConfig);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js ask ```


Allows you to request for some auth informations to the user.

## Parameters

- **settings** ([object Object]) Object: An object of settings. Here's the options available:
- title (null) {String}: The title to display on top of the form
- type (settings.type) {String}: Specify the auth type that you want to ask to the user
- error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
- info (null) {String}: An info message to display to the user


## Example (js)

```js
const authInfos = await myAuthInstance.ask();
// {
//   type: 'basic',
//   name: 'maAuth.basic',
//   token: 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
//   headers: {
//     Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
//   }
// }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _name ```


Store the instance name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _adapter ```


Store the instance adapter



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _settings ```


Store the instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js type ```


Access the auth type like "basic", "bearer", "oauth2", etc...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js authInfo ```


Get the authInfo object if already saved in memory or ask the user for this


### Example (js)

```js
const authInfo = await myAuth.authInfo();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

