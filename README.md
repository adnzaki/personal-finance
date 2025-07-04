# SisaUang
**SisaUang** is a simple personal finance manager application. This application is built based on my needs in managing my personal finance. If you want to add more features, just contribute or make your own version.

## Dev Installation

### Database Config
Before running API installation, make sure you have created a database and it has been set in <strong>.env</strong> file. Skipping this step will make database migration fail to run. 

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
- Run seeder to insert pre-filled data
```bash
php spark db:seed AllSeeder
```
SisaUang also supports running migration and seeder via API endpoint for production use:
```php
/api/public/run-command
```
And provide the following POST parameters:
```json
{
    "command": "migrate --all or db:seed AllSeeder",
    "username": "the_developer_username",
    "password": "the developer password"
}
```
*Note:*<br/>
- Developer username and password can be set in .env file with "dev_username" and "dev_password" key.
- Do not forget to setup your database config.






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