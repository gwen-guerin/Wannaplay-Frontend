import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import FriendsCards from '../components/FriendsCards';
import UploadImage from '../components/UploadImage';
import { SimpleLineIcons } from '@expo/vector-icons';
import { logout } from '../reducers/user';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

// construction de  la page profile
export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.user.value);

  const [user, setUser] = useState({
    firstname: null,
    tags: [],
    friends: [],
    city: null,
    age: null,
    teacher: [],
    description: null,
    profilePicture: null,
  });

  //useEffect utilisé pour charger la page profile de l'utilisateur au  moment de sa connection/signin
  useEffect(() => {
    fetch(`http://192.168.1.20:3000/users/profile/${userRed.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log('ERREUR', data);
          setUser({
            age: data.user.age,
            tags: data.user.tags,
            friends: data.user.friends,
            city: data.user.city,
            teacher: data.user.teacher,
            firstname: data.user.firstname,
            description: data.user.description,
            profilePicture: data.user.profilePicture,
          });
        }
      });
  }, []);

  //style conditionnel pour le statut online ou pas
  // let styleOnline = styles.online;
  // if (status) {
  //   styleOnline = styles.online1;
  // }

  //on map sur l'état teacher pour faire ressortir les tags/les instruments que l'utilisateur veut enseigner
  const teacherTag = user.teacher.map((teacher, i) => {
    function randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + 'aa';
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { backgroundColor: color }]} key={i}>
        #{teacher}
      </Text>
    );
  });

  //on map sur l'état tags pour faire ressortir les tags/les instruments pratiqué par l'utilisateur
  const tagsList = user.tags.map((tag, i) => {
    function randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + 'aa';
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { backgroundColor: color }]} key={i}>
        #{tag}
      </Text>
    );
  });

  //on map sur l'état friends pour faire ressortir les amis de l'utilisateur
  const friendsList = user.friends.map((friend, i) => {
    return <FriendsCards key={i} friend={friend} />;
  });

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Home');
  };

  const handleModify = () => {
    navigation.navigate('UpdateProfile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerProfile}>
        <UploadImage />
        <View style={styles.nameAndTags}>
          <View style={styles.nameAndStatus}>
            <Text style={styles.textUsername}>#{userRed.username}</Text>
            {/* <View style={styleOnline}></View> */}
            <SimpleLineIcons
              style={styles.logoLogout}
              name="logout"
              size={15}
              color="black"
              onPress={() => handleLogout()}
            />
          </View>
          <View style={styles.tagandteach}>
            <View style={styles.tagsList}>{tagsList}</View>
            <View style={styles.tagsList}>
              <Text style={styles.textUser}>Wanna teach : </Text>
              {teacherTag}
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.description}>
          <View style={styles.infoContainer}>
            <Text style={styles.textUser}>About me : </Text>
            <Text style={styles.textUser}>{user.firstname}</Text>
            <Text style={styles.textUser}>{user.age}ans</Text>
            <Text style={styles.textUser}>{user.city}</Text>
          </View>
          <Text style={styles.textDecription}>{user.description}</Text>
          <View style={styles.modifyIcon}>
            <FontAwesome
              onPress={() => handleModify()}
              name="pencil-square-o"
              size={16}
              color="#A3A3A3"
            />
          </View>
        </View>
        <View style={styles.friendsCardsContainer}>
          <ScrollView horizontal={true}>{friendsList}</ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingTop: 50,
    padding: 10,
    backgroundColor: '#A8F9DE',
  },
  userPicture: {
    borderRadius: 60,
    width: 80,
    height: 80,
  },
  friendsTab: {
    backgroundColor: 'white',
    opacity: 0.9,
    borderRadius: 40,
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    opacity: 0.6,
  },
  friendsList: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  textUser: {
    fontSize: 15,
    margin: 2,
    color: '#CE2174',
    alignItems: 'center',
    fontWeight: '700',
  },
  textDecription: {
    fontSize: 17,
    color: '#CE2174',
    alignItems: 'center',
    padding: 5,
    fontWeight: '700',
  },
  textUser1: {
    fontSize: 14,
    fontWeight: '800',
    color: 'black',
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    margin: 5,
  },
  textUsername: {
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
    color: '#CE2174',
  },
  nameAndStatus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  friends: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
    color: '#CE2174',
  },
  online: {
    height: 20,
    width: 20,
    borderRadius: 40,
  },
  online1: {
    height: 20,
    width: 20,
    borderRadius: 40,
  },
  friendsView: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 20,
  },
  tagandteach: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
  },
  headerProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndTags: {
    marginLeft: 20,
    width: 150,
  },
  description: {
    backgroundColor: '#C5C5C5',
    display: 'flex',
    alignItems: 'stretch',
    borderRadius: 5,
    width: '100%',
    padding: 5,
    marginTop: 25,
  },
  infoContainer: {
    backgroundColor: '#A3A3A3aa',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  modifyIcon: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: -15,
  },
  iconContainer: {
    marginTop: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  friendsCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: 600,
    backgroundColor: 'red',
    marginTop: 25,
  },
});
