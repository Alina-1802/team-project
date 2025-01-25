import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import vike from "vike/plugin";
import postcssPresetEnv from 'postcss-preset-env';
import postcssGlobalData from '@csstools/postcss-global-data'
import postcssCustomMedia from 'postcss-custom-media';
import path from 'path'

export default defineConfig({
    plugins: [
        vike({prerender: true}),
        react({})
    ],
    css: {
        modules: {
            generateScopedName: "[local]__[hash:base64:6]",
        },
        postcss: {
            plugins: [
                postcssPresetEnv({
                    features: {
                        "nesting-rules": true,
                        // "custom-media-queries": true,
                    },
                }),
                postcssGlobalData({
                    files: ["./assets/styles/global.css"],
                }),
                postcssCustomMedia(),
            ],
        }
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'assets'),
            '@components': path.resolve(__dirname, 'components'),
            '@type': path.resolve(__dirname, 'type'),
        },
    },
});
