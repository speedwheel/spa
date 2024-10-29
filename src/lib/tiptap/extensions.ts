import { Placeholder } from '@tiptap/extension-placeholder';

export function createCustomPlaceholder(
	placeholderText: string,
	emptyClass: string = 'is-editor-empty'
) {
	return Placeholder.configure({
		placeholder: placeholderText,
		emptyEditorClass: emptyClass
	});
}
