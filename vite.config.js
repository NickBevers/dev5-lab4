import { defineConfig } from "vite";

export default defineConfig({
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.png'],
    publicDir: '/public',
})