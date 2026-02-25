import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleDailyReminder = async (hour: number = 8, minute: number = 0) => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Java Quest', body: 'Your daily tasks are waiting! Keep the streak alive.' },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
  });
};

export const sendCompletionNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'All Done!', body: 'You completed all tasks for today. Great work!' },
    trigger: null,
  });
};
