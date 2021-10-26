import { defineConfig } from "vite";
import path from "path";
import { createVuePlugin } from "vite-plugin-vue2";
import copy from "rollup-plugin-copy";
// const { injectHtml } = require('vite-plugin-html');
// const resolveExternalsPlugin = require('vite-plugin-resolve-externals');

let configParam = process.env.npm_lifecycle_event;
let configParamArr = configParam.split(":");

let buildLib = {};
let isLib = false;

if (configParam.includes("lib")) {
  isLib = true;
  let prex = configParamArr[0];
  let cmd = "ui";
  if (configParamArr.length == 2) {
    cmd = configParamArr[1];
  }
  buildLib = {
    outDir: `../lib/box-${cmd}`,
    lib: {
      entry: path.resolve(__dirname, `src/components/${cmd}/main.ts`),
      name: "boxui",
      formats: ["es", "umd"],
      fileName: (format) => {
        if (format == "es") {
          return `box-${cmd}.min.js`;
        }
        return `box-${cmd}-${format}.min.js`;
      },
    },
  };
}

if (configParam.includes("npm")) {
  isLib = true;
  let prex = configParamArr[0];
  let cmd = "ui";
  if (configParamArr.length == 2) {
    cmd = configParamArr[1];
  }
  buildLib = {
    outDir: `./scripts/lib/box-${cmd}/dist`,
    lib: {
      entry: path.resolve(__dirname, `src/components/${cmd}/main.ts`),
      name: "boxui",
      formats: ["es", "umd"],
      fileName: (format) => {
        if (format == "es") {
          return `box-${cmd}.min.js`;
        }
        return `box-${cmd}-${format}.min.js`;
      },
    },
  };
}


/*
const copyConfig = copy({
  targets: [
    {
      src: "./test.txt",
      dest: "./dist",
    },
  ],
});
*/
// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [vue()],
  plugins: [createVuePlugin()],
  base: "./",
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024 * 2,
    ...buildLib,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "@vue/composition-api", "element-ui", "echart", "vuex"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
        inlineDynamicImports: isLib,
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  define: {
    "process.env": process.env,
  },
  server: {
    port: 8080,
  },
});
