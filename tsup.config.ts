import { defineConfig } from "tsup";

// const js = String.raw;

export default defineConfig({
	dts: true,
	entry: ["src/index.ts"],
	sourcemap: true,
	splitting: false,
	target: "esnext",
	format: ["esm", "cjs"],
	// esbuildOptions: (options) => {
	// 	options.footer = {
	// 		js: js`module.exports = module.exports.default`,
	// 	};
	// },
});
