/** @format */

import useStore, { useNotificationStore } from './zustand/store';
import { ValueChanger } from './General/ValueChanger';
const Testing = () => {
	const { changeUser, user_id, your_best_submission, updateSubmission } =
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
		newYourBestScore: number | string | undefined
	) => {
		// should be a number
		if (newYourBestScore === undefined) return;
		if (typeof newYourBestScore === 'string') {
			newYourBestScore = parseInt(newYourBestScore);
		}

		updateSubmission(
			{
				points: newYourBestScore,
				aplus_id: user_id,
				exercise: your_best_submission?.exercise || 0,
				_order: your_best_submission?._order || 0,
			}

		)

		setNotification('TESTING TOOLS: State updated');
		setNotificationType('info');
	};

	return (
		<>
			<h3>Testing Tools</h3>

			<ValueChanger
				label='Change user id'
				onSubmit={handleUserIdChange}
				value={user_id}

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




