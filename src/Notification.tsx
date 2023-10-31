/** @format */

import { useNotificationStore } from './zustand/store';

const Notification = () => {
	const { notification, notificationType } = useNotificationStore(
		(state) => state
	);

	return (
		<div id='noDataAlert' className={`alert alert-${notificationType}`}>
			{notification}
		</div>
	);
};

export default Notification;
