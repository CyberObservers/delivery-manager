# Delivery App Frontend

This app is the frontend of flag camp team 02. It is based on React.js, using `Material UI` and `Ant Design`. Developers should update [What's new](#what's-new) section `README.md` to indicate new features, bug fixes or other issues. [Here](https://github.com/defene/Delivery-management-app) is the repo of our backend.

## What's new

### 2024.12.28

- Refactor the Google Maps API logic from MakeOrder.js and moved it into a separate GoogleMaps.js file under the utils folder.

### 2024.12.21

- Update delivery routes page. 
- Add mode selection buttons and a map with a route using Google Map API.

### 2024.12.19

- Add background of home page and order main page
- Update attributes in `routesConfig.js`.
- Build overall navigation and components architecture of order subsystem.

### 2024.12.18

- Specify versions of each dependency.
- Designed overall project structures.
- Implemented Navigation bar.

## Quick Start

First, direct to the root of this app and install dependencies.

```
npm i
```

Then, run the app.

```
npm start
```

## Project Structure Introduction

There are two main folders under the `src` folder: `components` and `styles`. Developments should be conducted in these folders.

### components

This folders contains components. It is divided into `auth`, `home`, `order`, `profile`, `utils` and root components.

#### routesConfig.js

- [This file](./src/components/routesConfig.js) registers routes of each components. Once a component needs to be navigated, it should be included in this file. [`Main.js`](./src/components/Main.js) will add them to the router.

#### Normal Components

- `auth` : this folder contains components related to authentication and authorization, such as `Login` and `Register`.

- `home` : this folder contains home components of user and admin.
- `order`: this folder contains components related to order, such as CRUD of orders.
- `profile`: this folder contains components related to profiles, such as displaying personal information.
- `utils`: this folder contains some helpful functions and components, such as the [navigation bar](./src/components/utils/ResponsiveAppBar.js) of the app and the 'not found' page of the app.
- Other files: other files include `Main.js` , `App.js`, etc. 

### Styles

- styles are placed in the `styles` folder. It's recommended that developers add folders to place css files in order.
