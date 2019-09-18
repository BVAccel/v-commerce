
# gulp-vue

## Project Setup

gulp-vue uses yarn for dependency management, webpack for JavaScript compilation, and gulp for task orchestration.

```
# install dependencies
yarn
```

You will also need to set up a `.env` file in the root of the project. Copy and paste the following, and replace with your own credentials and theme ID:

```
URL=gulp-vue.myshopify.com
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
PASSWORD=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
THEME_ID=XXXXXXXXXXX
```

## Gulp Tasks

A list of these tasks can be found in `package.json`. Watchers will automatically deploy file changes to the theme in `.env`.

`yarn watch`
⋅⋅⋅Run the build tool and watch files for changes

`yarn start`
⋅⋅⋅Run the build tool, deploy all files to the theme in `.env`, and watch files for changes

`yarn build`
⋅⋅⋅Run the build tool

`yarn build:prod`
⋅⋅⋅Run the build tool and minify assets

`yarn deploy`
⋅⋅⋅Run the build tool and deploy all files to the theme in `.env`
