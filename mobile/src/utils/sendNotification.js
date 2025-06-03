import messaging from '@react-native-firebase/messaging';
import {registerDeviceToken} from '@/api/user';

export async function registerDevice() {
  const token = await messaging().getToken();
  const {data, status} = await registerDeviceToken({token});
  if (status === 200) {
    console.log('Device registered successfully');
  } else {
    console.log('An error occurred while registering device');
  }
}
