# personal-finance
A simple personal finance manager application

## Dev Installation

### Database Config
Before running API installation, make sure you have created a database named "sisa-uang" and it has been set in <strong>.env</strong> file. Skip this step will make database migration failed to run. 

### API
- Go to `/api` folder

```bash
cd api
```
- Install required dependencies
```bash
composer install
```
- Run all database migrations
```bash
php spark migrate --all
```


### User Interface
- Go to `/app` folder
```bash
cd app
```
- Install required dependencies
```bash
npm install
```
- Run Quasar dev server with PWA mode to open the app
```bash
quasar dev -m pwa
```

## Build User Interface
- Open `app/build.config.js` file
- Change the `mode` constant to `production`
- Run Quasar build command
```bash
quasar build -m pwa
```
- Discard changes of `app/build.config.js` file
- Delete all files inside `app` folder except the `ui-dev`
- Copy all files from `app/dist/pwa` to `app` folder