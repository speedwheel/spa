import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	// compilerOptions: {
	// 	// disable all warnings coming from node_modules and all accessibility warnings
	// 	warningFilter: (warning) => !warning.filename?.includes('node_modules') && !warning.code.match('a11y_click_events_have_key_event') || !warning.code.match('a11y_no_static_element_interactions')
	// },

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below

			pages: 'build',
			assets: 'build',
			fallback: "index.html",
			precompress: false,
			strict: true,
		},
		),
		paths: {
			base: "/spa"
		},
	}
};

export default config;
