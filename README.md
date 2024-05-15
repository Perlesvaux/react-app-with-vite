# Host your React App on Github Pages with Vite!

Initialize project
```bash
npm create vite@latest
# cd into the project
npm install --save-dev gh-pages
```

Update **package.json**
```js
"scripts": {
  "predeploy": "vite build",
  "deploy": "gh-pages -d dist",
  ...
}
```

Update **vite.config.js**
```js
...
export default defineConfig({
  base:'/REPOSITORY_NAME/',
  plugins: [react()],
})
```

Time to deploy!
```bash
npm run deploy
```

# Requirements:
**Node**
```bash
# Installing Node and npm through nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install 18
nvm use 18
```

**Local Repository**
https://git-scm.com/downloads
```bash
git init
```

**Remote Repository**
Create new repository [here](https://github.com/new)
```bash
git remote add origin https://github.com/USERNAME/REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```


