/** @format */

import useStore from './zustand/store';

type ViewProps = {
	for: 'student' | 'teacher';
	children: React.ReactNode;
};

/**
 * @description A view selector component that shows its children if the viewer_type is the same as the "for" prop
 * @param {ViewProps} { for: viewer_type, children }
 * @returns {React.ReactNode}
 */
const View = ({ for: viewer_type, children }: ViewProps) => {
	const viewer_type_store = useStore((state) => state.viewer_type);

	if (viewer_type_store === viewer_type) {
		return <>{children}</>;
	}
	return null;
};

export default View;
