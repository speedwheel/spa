import { Placeholder } from '@tiptap/extension-placeholder';

export const createCustomPlaceholder = (
	placeholderText: string,
	emptyClass: string = 'is-editor-empty'
) => {
	return Placeholder.configure({
		placeholder: placeholderText,
		emptyEditorClass: emptyClass
	});
};
