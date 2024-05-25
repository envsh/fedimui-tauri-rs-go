# Tauri + Vue 3 + TypeScript

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


$ npm run
Scripts available in tauriuirs@0.0.0 via `npm run-script`:
  dev
    vite
  build
    vue-tsc --noEmit && vite build
  preview
    vite preview
  tauri
    tauri

$ cargo create-tauri-app projname --beta
✔ Choose which language to use for your frontend · TypeScript / JavaScript - (pnpm, yarn, npm, bun)
✔ Choose your package manager · npm
✔ Choose your UI template · Vue - (https://vuejs.org/)
✔ Choose your UI flavor · TypeScript
✔ Would you like to setup the project for mobile as well? · yes

Template created! To get started run:
  cd --
  npm install
  npm run tauri android init
  npm run tauri ios init

For Desktop development, run:
  npm run tauri dev

For Android development, run:
  npm run tauri android dev

For iOS development, run:
  npm run tauri ios dev

* how make a install package
  npm run tauri build? => package,dmg,


* android todo:
NDK_HOME=/usr/local/share/android-ndk ANDROID_HOME=/opt/android-sdk/platforms/android-33/ npm run tauri android init
NDK_HOME=/usr/local/share/android-ndk npm run tauri android dev
