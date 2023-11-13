import { useNotificationStore } from "../zustand/store"

const StateNotificationDisplayer = () => {
    const {notification, notificationType} = useNotificationStore((state) => state);
    return(
        <p>
            Notification: <b>{notificationType}: {notification}</b>
        </p>

    )
}

export default StateNotificationDisplayer;