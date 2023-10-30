import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { mockChores } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import { useChoresContext } from '../Context/ChoressContext';
import { useProfileContext } from '../Context/ProfileContext';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

interface chore {
  id: string;
  slectedHomeId: string;
  name: string;
  imageUri: string;
  discription: string;
  interval: string;
  task_rating: string;
}

const TaskDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { profiles } = useProfileContext();
  const { getChoreById } = useChoresContext(); // skapa funktionen getChoreById i Context
  const Chore = getChoreById(route.params.choreId);

  const handelTaskAvklarat = async () => {
    try {
      const ChoreEvent = {
        id: mockChores[1].id,
        // bör använda route.params.profilId
        user_id: slectedUserId.current,
        home_id: slectedHomeId.current,
        Chore_id: Chore?.id.toString(),
        date: new Date(),
      };
      console.log('ChoreEvent', ChoreEvent);
      navigation.navigate('Household');
    } catch (error) {
      console.log(error);
    }
  };
  const handelRedigera = () => {
    navigation.navigate('EditTask');
  };
  const nameStyle = {
    height: 40,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 20,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 20,
      }}
    >
      <ScrollView>
        {Chore ? (
          <View>
            <Text style={{ ...nameStyle, width: '100%' }}>ID: {Chore.id}</Text>
            <Text style={nameStyle}>
              Selected Home ID: {Chore.slectedHomeId}
            </Text>
            <Text style={nameStyle}>Title: {Chore.name}</Text>
            <Text style={nameStyle}>Description: {Chore.discription}</Text>
            <Text style={nameStyle}>Interval: {Chore.interval}</Text>
            <Text style={nameStyle}>Rating: {Chore.task_rating}</Text>
            {Image && (
              <Image
                source={{ uri: Chore.imageUri }}
                style={{
                  width: 380,
                  height: 225,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
            )}
          </View>
        ) : (
          <Text>Loading task data...</Text>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <Button
          style={{
            marginBottom: 5,
            height: 50,
            width: '48%',
            justifyContent: 'center',
            backgroundColor: ProjectTheme.colors.primary,
          }}
          icon="archive-plus-outline"
          mode="contained"
          onPress={handelTaskAvklarat}
          labelStyle={{ color: ProjectTheme.colors.secondary }}
          rippleColor={ProjectTheme.colors.background}
        >
          Avklarat
        </Button>
        {activeProfile.isOwner && (
          <Button
            style={{
              elevation: ProjectTheme.elevation.large,
              marginBottom: 5,
              height: 50,
              width: '48%',
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="archive-cog-outline"
            mode="contained"
            onPress={handelRedigera}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Redigera
          </Button>
        )}
      </View>
    </View>
  );
};
export default TaskDetailsScreen;
