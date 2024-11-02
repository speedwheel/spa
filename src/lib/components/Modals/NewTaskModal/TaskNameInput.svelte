<script lang="ts">
	import { oneLiner } from '$lib/tiptap/customNodes';
	import { createCustomPlaceholder } from '$lib/tiptap/extensions';

	import { Editor } from '@tiptap/core';
	import Paragraph from '@tiptap/extension-paragraph';

	import Text from '@tiptap/extension-text';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	interface Props {
		value: string | null;
	}

	let { value = $bindable() }: Props = $props();

	let editorEl: HTMLElement;
	let editor: Editor | null = null;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			extensions: [
				oneLiner,
				Text,
				Paragraph.extend({
					addKeyboardShortcuts: () => {
						return {
							Enter: (): boolean => {
								dispatch('enterKeyPressed');
								return true;
							}
						};
					}
				}),
				createCustomPlaceholder('Task name')
			],
			element: editorEl,
			content: value,
			onUpdate(props) {
				value = props.editor.getText();
			},
			onTransaction(transaction) {
				editor = transaction.editor;
			},
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert prose-2xl mb-4 focus:outline-none'
				}
			}
		});

		if (!value) editor.commands.focus();
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={editorEl}></div>
