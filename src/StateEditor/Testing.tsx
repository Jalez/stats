/** @format */

import useStore, { useNotificationStore } from '../zustand/store';
import { ValueChanger } from '../General/ValueChanger';
const Testing = () => {
	const { changeUser, user_id, your_best_submission, updateYourSubmission } =
		useStore((state) => state);
	const { setNotification, setNotificationType } = useNotificationStore(
		(state) => state
	);

	// if(!your_best_submission) return "No submission found with the given id, please change the id to use another submission";
	const your_best_score = your_best_submission?.points || -1;


	const handleUserIdChange = (
		newUserId: number | string | undefined
	) => {
		// should be a number
		if (newUserId === undefined) return;
		if (typeof newUserId === 'string') {
			newUserId = parseInt(newUserId);
		}
		changeUser(newUserId);
		setNotification('TESTING TOOLS: User id updated to ' + newUserId);
		setNotificationType('info');
	}

	const updateScore = (
		newYourBestSubmission: number | string | undefined
	) => {
		// should be a number
		if (newYourBestSubmission === undefined) return;
		if (typeof newYourBestSubmission === 'string') {
			newYourBestSubmission = parseInt(newYourBestSubmission);
		}

		updateYourSubmission({ ...your_best_submission, points: newYourBestSubmission });

		setNotification('TESTING TOOLS: State updated');
		setNotificationType('info');
	};



	return (
		<>
			<h3>Updating selected user</h3>

			
			<ValueChanger
				label='Change user id'
				onSubmit={handleUserIdChange}
				value={user_id || 0}

			/>

			<ValueChanger
				label='Change ids best score'
				onSubmit={updateScore}
				value={your_best_score}
			/>
		</>
	);
};

export default Testing;




