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

const REMINDER_MESSAGES = [
  { title: '☕ Java Quest', body: 'Your daily tasks are waiting! Keep the streak alive.' },
  { title: '🔥 Don\'t break the streak!', body: 'A few minutes of study today keeps the bugs away.' },
  { title: '💪 Time to level up!', body: 'Your Java quest continues. Open the app and get started.' },
  { title: '📖 Study reminder', body: 'Consistency beats intensity. Tackle today\'s tasks now.' },
  { title: '🎯 Stay on target', body: 'Your future self will thank you. Let\'s go!' },
];

export const requestPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleDailyReminder = async (hour: number, minute: number) => {
  await cancelAllReminders();
  const msg = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
  await Notifications.scheduleNotificationAsync({
    content: { title: msg.title, body: msg.body, sound: true },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
  });
};

export const cancelAllReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const getScheduledNotifications = async () => {
  return Notifications.getAllScheduledNotificationsAsync();
};

export const sendCompletionNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'All Done!', body: 'You completed all tasks for today. Great work! 🎉' },
    trigger: null,
  });
};
