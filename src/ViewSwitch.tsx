import useStore, { useNotificationStore } from "./zustand/store";

const ViewSwitch = () => {
	const { viewer_type, setViewerType } = useStore((state) => state);
	const { setNotification } = useNotificationStore((state) => state);

	const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setViewerType(e.target.checked ? 'student' : 'teacher');
		setNotification('TESTING TOOLS: Viewer type updated to ' + viewer_type);

	};

	return (
		<div className='form-check form-switch'>
			<input
				className='form-check-input'
				type='checkbox'
				id='testModeSwitch'
				onChange={handleSwitch}
			/>
			<label className='form-check-label' htmlFor='testModeSwitch'>
				{/* Teacher or Student */}
				{viewer_type === 'student' ? 'Student' : 'Teacher'}
			</label>
			{/* Add a user_id input changer */}
		</div>
	);
}

export default ViewSwitch;