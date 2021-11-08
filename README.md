# Setup

Remote Lab Site contains web interface for application. It can be started independently, but it will contain no back-end services or data if API is not running or database is empty.

Clone code for site
```
git clone git@github.com:PhysicsRemotelab/rlab-site.git
```

After cloning, go to directory and install Node dependencies. Dependencies to be installed are defined in package.json file.
```
npm install
```

After dependencies are installed, run application
```
npm start
```

Visit website locally at the address
```
http://localhost:4200/
```

## Run production
* npm run start:prod

## Debugging
* Debugging requires `Debugger for Chrome` Visual Studio Code extension

# Upgrade all versions
Check outdated dependencies
```
npm outdated
```

Install tool for upgrading all dependencies
```
npm install -g npm-check-updates
```

Use command to upgrade all dependencies
```
ncu -u
```

## Additional reading
* https://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl
* https://stackoverflow.com/questions/39210467/get-angular-cli-to-ng-serve-over-https
* https://stackoverflow.com/questions/57557560/how-to-solve-the-error06065064digital-envelope-routinesevp-decryptfinal-exb
* https://auth0.com/blog/complete-guide-to-angular-user-authentication/
* https://auth0.com/docs/architecture-scenarios/spa-api/spa-implementation-angular2
* https://medium.com/better-programming/angular-building-a-crud-application-with-ngrx-40e5f1c0b50c
* https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket
