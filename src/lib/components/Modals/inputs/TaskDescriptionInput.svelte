<script lang="ts">
	import { createCustomPlaceholder } from '$lib/tiptap/extensions';
	import type { Task } from '$lib/types/tasks';

	import { Editor } from '@tiptap/core';
	import TaskItem from '@tiptap/extension-task-item';
	import TaskList from '@tiptap/extension-task-list';
	import StarterKit from '@tiptap/starter-kit';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	interface Props {
		value: string | null;
	}

	let { value = $bindable() }: Props = $props();

	let editorEl: HTMLElement;
	let editor: Editor | null = null;
	let inputTimeout: NodeJS.Timeout;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			extensions: [
				StarterKit,
				TaskList.configure({
					HTMLAttributes: {
						class: 'list-none p-0'
					}
				}),
				TaskItem.configure({
					nested: true,
					HTMLAttributes: {
						class: 'flex gap-2 m-0 [&:not(:has(ul))]:items-center [&_ul]:m-0'
					}
				}),
				createCustomPlaceholder('Task description')
			],
			element: editorEl,
			content: value,
			onUpdate(props) {
				clearTimeout(inputTimeout);
				inputTimeout = setTimeout(() => {
					dispatch('update', { type: 'description', value: props.editor.getHTML() });
					value = props.editor.getHTML();
				}, 300);
			},
			onTransaction(transaction) {
				editor = transaction.editor;
			},
			editorProps: {
				attributes: {
					class:
						'prose dark:prose-invert prose-sm focus:outline-none prose-p:my-0 prose-li:m-0 max-w-full'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={editorEl}></div>
