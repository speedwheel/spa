<script lang="ts">
	import '$lib/fonts';
	import '../../app.css';

	import Logo from '../../static/images/Logo.svelte';
	import MenuIcon from '../../static/images/MenuIcon.svelte';
	import avatar from '../../static/images/avatar.png';
	import EditIcon from '../../static/images/EditIcon.svelte';
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';

	document.body.classList.add('flex', 'flex-col', 'h-full', 'select-none', 'dark:bg-neutral-800');
	document.documentElement.classList.add('dark', 'custom-scrollbars', 'h-full');
</script>

<header class="flex items-center border-b px-4 py-4 dark:border-b-neutral-700">
	<div class="flex w-72 items-center justify-between">
		<a href="/">
			<Logo className="h-9" />
		</a>
		<button
			class="flex size-9 items-center justify-center rounded-lg border dark:border-neutral-700 dark:bg-neutral-900"
		>
			<MenuIcon />
		</button>
	</div>
	<div class="relative ml-4 w-full max-w-xl">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<Icon src={MagnifyingGlass} solid class="size-5 dark:text-neutral-400" />
		</div>
		<input
			type="search"
			class="block h-9 w-full rounded-lg border py-0 pl-10 text-sm text-neutral-900 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
			placeholder="Search"
		/>
	</div>
	<div class="ml-auto flex gap-5">
		<button>
			<EditIcon />
		</button>
		<button>
			<img src={avatar} alt="avatar" class="h-9 w-9 rounded-full" />
		</button>
	</div>
</header>
