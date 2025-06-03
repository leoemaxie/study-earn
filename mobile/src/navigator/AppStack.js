import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SeeMore from '@/screens/Main/Home/SeeMore';
import CourseDetail from '@/screens/Main/Home/CourseDetail';
import SearchScreen from '@/screens/Main/Home/SearchScreen';
import NotificationScreen from '@/screens/Main/Home/NotificationScreen';
import BusinessScreenDetails from '@/screens/Main/Business/BusinessScreenDetails';
import CourseScreen from '@/screens/Main/Home/Courses/CourseScreen';
import PastQuestionScreen from '@/screens/Main/Home/PastQuestion/PastQuestionScreen';
import ChatScreen from '@/screens/Main/Home/Chat/ChatScreen';
import ProfileScreen from '@/screens/Main/Profile/ProfileScreen';
import EditProfile from '@/screens/Main/Profile/EditProfile';
import ViewPaymentMethod from '@/screens/Main/Payment/ViewPaymentMethod';
import PaymentHistory from '@/screens/Main/Payment/PaymentHistory';
import WithdrawPoint from '@/screens/Main/Payment/WithdrawPoint';
import AddPaymentMethod from '@/screens/Main/Payment/AddPaymentMethod';
import ChatOpen from '@/screens/Main/Home/Chat/ChatOpen';
import OpportunityScreen from '@/screens/Main/Home/Opportunities/OpportunityScreen';
import CourseDescription from '@/screens/Main/Home/Courses/CourseDescription';
import SendNotification from '@/screens/Main/Institution/Security/SecurityScreen';
import EventScreen from '@/screens/Main/Home/Events/EventScreen';
import EventScreenDetails from '@/screens/Main/Home/Events/EventScreenDetail';
import AnnouncementScreen from '@/screens/Main/Institution/Announcement/AnnouncementScreen';
import ProductScreenDetails from '@/screens/Main/Business/Products/ProductScreenDetails';
import ProductScreen from '@/screens/Main/Business/Products/ProductScreen';
import AnnouncementScreenDetails from '@/screens/Main/Institution/Announcement/AnnouncementScreenDetails';
import CalendarScreen from '@/screens/Main/Institution/Calendar/CalendarScreen';
import CalendarScreenDetails from '@/screens/Main/Institution/Calendar/CalendarScreenDetails';
import FacultyScreen from '@/screens/Main/Institution/Faculty/FacultyScreen';
import FacultyScreenDetails from '@/screens/Main/Institution/Faculty/FacultyScreenDetails';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Bottom"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bottom" component={BottomTab} />

      {/* HOME */}
      <Stack.Screen name="SeeMore" component={SeeMore} />
      <Stack.Screen name="CourseDetail" component={CourseDetail} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

      {/* NEW HOME */}
      <Stack.Screen name="CourseScreen" component={CourseScreen} />
      <Stack.Screen name="CourseDescription" component={CourseDescription} />
      <Stack.Screen name="PastQuestionScreen" component={PastQuestionScreen} />
      <Stack.Screen name="OpportunityScreen" component={OpportunityScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatOpen" component={ChatOpen} />

      {/* EVENTS */}
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="EventScreenDetails" component={EventScreenDetails} />

      {/* BUSSINESS SCREEN */}
      <Stack.Screen
        name="BusinessScreenDetails"
        component={BusinessScreenDetails}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen
        name="ProductScreenDetails"
        component={ProductScreenDetails}
      />

      {/* PAYMENT */}
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
      <Stack.Screen name="ViewPaymentMethod" component={ViewPaymentMethod} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="WithdrawPoint" component={WithdrawPoint} />

      {/* NOTIFICATION */}
      <Stack.Screen name="Security" component={SendNotification} />

      {/* PROFILE */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

      {/* INSTITUTION */}
      <Stack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
      <Stack.Screen
        name="AnnouncementScreenDetails"
        component={AnnouncementScreenDetails}
      />
      <Stack.Screen
        name="CalendarScreenDetails"
        component={CalendarScreenDetails}
      />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="FacultyScreen" component={FacultyScreen} />
      <Stack.Screen
        name="FacultyScreenDetails"
        component={FacultyScreenDetails}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
