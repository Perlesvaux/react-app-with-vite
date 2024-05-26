# Host your React App on Github Pages with Vite!

Initialize project
```bash
npm create vite@latest
# cd into the project
npm install --save-dev gh-pages
```

Update **package.json**

- With npm:
```bash
npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist'
```

- Manually:
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

# Then, go to: https://github.com/USERNAME/REPOSITORY_NAME/settings/pages
# In Branch, select: 'gh-pages'. Then, save.
```

# Environment-based configurations
Create **.env.development** & **.env.production** at the root of your Vite project.

```bash
# Specify the port at localhost you use for development
echo "VITE_API_URL=http://localhost:3000" >> .env.development

# Specify the URL to the actual web-app
echo "VITE_API_URL=https://cvmkr-backend.onrender.com" >> .env.production

# Make a new component loading this configuration
echo "const apiUrl = import.meta.env.VITE_API_URL;
export default apiUrl;" >> ./src/config.js

```

**Finally, import it into your App.jsx**
```js
import apiUrl from './config'
...
```




