import flowbitePlugin from 'flowbite/plugin';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	container: {
		center: true,
		padding: '1rem'
	},
	safelist: [
		{
			pattern: /(text)-(red|yellow|blue|gray)-(400)/
		}
	],
	theme: {
		extend: {
			fontSize: {
				'2xs': '.625rem'
			},
			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				},
				// tickup accent colors
				accent: {
					purple: {
						'1': '#671AC0',
						'2': '#AB47BC'
					}
				}
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio, flowbitePlugin]
} as Config;
