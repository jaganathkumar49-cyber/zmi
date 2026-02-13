import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 5173,
		host: true,
	},
	build: {
		outDir: "dist",
		sourcemap: true,
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].[hash].js",
				chunkFileNames: "assets/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
		},
	},
	resolve: {
		alias: {
			public: "/public",
			src: "/src",
			routes: "/src/routes",
			layouts: "/src/layouts",
			api: "/src/api",
			assets: "/src/assets",
			components: "/src/components",
			hooks: "/src/hooks",
			utils: "/src/utils",
			views: "/src/views",
		},
	},
});
