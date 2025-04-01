# Annonce

  Test task Frontend developer Vue/Nuxt. Web studio Regul

## Technologies

The project uses the following technologies and tools:

- **Vue 3** — JavaScript framework for creating user interfaces.
- **Nuxt 3** — Vue-based framework for SSR and static applications.
- **Composition API** — modern Vue API for organizing component logic.
- **Quasar** — UI library with ready-made components.
- **JWT (JSON Web Token)** — for user authentication.
- **@nuxtjs/device** — module for determining the device type.
- **Git** — for version control.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

# Project setup

## Install Quasar
- Install Quasar and its extras:
``` bash
# pnpm
pnpm add quasar @quasar/extras
npx nuxi@latest module add quasar

# yarn
yarn add quasar @quasar/extras
npx nuxi@latest module add quasar

# npm
npm install quasar @quasar/extras
npx nuxi@latest module add quasar
```

## Add required modules
- Install additional modules for device detection:

``` bash
# npm
npm install @nuxtjs/device
or
npx nuxi@latest module add device
```
##  Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
```bash
# npm
npm i sass
```

## JavaScript module for JSON Object Signing and Encryption

```bash
# npm
npm i jose

```

## Configure nuxt.config.ts
- Update your nuxt.config.ts file with the following configuration:

```
export default defineNuxtConfig({
  compatibilityDate: "2025-03-16",
  ssr: true,  
  experimental: {
    payloadExtraction: false
  },
  modules: ["@nuxtjs/device", "nuxt-quasar-ui"],
  app:{
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600&display=auto',
        },
      ],
    },
  },
  quasar: {
    plugins: [
      "BottomSheet",
      "Dialog",
      "Loading",
      "LoadingBar",
      "Notify",
      "Dark",
    ],
    sassVariables: '@/assets/style/quasar/variables.scss' ,
    extras: {
      fontIcons: [
        "eva-icons",
        "material-icons",
        "mdi-v7",
        "mdi-v6",
        "bootstrap-icons"
      ],
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },
});


```

# Running the Project

## Development Server

- Start the development server on [localhost ](http://localhost:3000):

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

- Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```
## Preview Production Build

- Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Additional Information
- **Nuxt** Documentation: [Nuxt Docs](https://nuxt.com/docs/getting-started/introduction)

- **Quasar** Documentation: [Quasar Docs](https://quasar.dev/docs)

- **ESLint** Configuration: [ESLint Docs](https://eslint.org/docs/latest/)

- **Prettier** Configuration: [Prettier Docs](https://prettier.io/docs/index.html)

### Author
**Eldar Sabirovich**

## License

[MIT](https://choosealicense.com/licenses/mit/)