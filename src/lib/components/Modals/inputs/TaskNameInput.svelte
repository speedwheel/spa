<script lang="ts">
	import { oneLiner } from '$lib/tiptap/customNodes';
	import { createCustomPlaceholder } from '$lib/tiptap/extensions';
	import type { Task } from '$lib/types/tasks';

	import { Editor } from '@tiptap/core';
	import Paragraph from '@tiptap/extension-paragraph';

	import Text from '@tiptap/extension-text';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	interface Props {
		value: string | null;
		delay?: number;
		onUpdate?: {
			set value(value: string);
			get value(): string;
		};
	}

	let { value = $bindable(), onUpdate = $bindable(), ...props }: Props = $props();

	let editorEl: HTMLElement;
	let editor: Editor | null = null;
	let inputTimeout: NodeJS.Timeout;

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
			onUpdate(propsInput) {
				clearTimeout(inputTimeout);
				inputTimeout = setTimeout(() => {
					if (onUpdate) {
						onUpdate.value = propsInput.editor.getText();
					} else {
						value = propsInput.editor.getText();
					}
				}, props.delay);
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
