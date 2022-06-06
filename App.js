// expo start
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight, TextInput, TouchableWithoutFeedback, Platform, StatusBar, Animated } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Clipboard } from 'react-native';

API_KEY = require('API_KEY.js')


export default class App extends React.Component {

  notificationsGreedings = [`Time for spit out some feelings!`, `Tell me your secrets..`, `Pls 🥺🥺🥺`, `Tooo the moon ~!`]

  scheduleNotifications = async () => {
    // Cancel All notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
    //9AM notification
    await Notifications.scheduleNotificationAsync({
      identifier: 'forgetmenot-1',
      content: {
        title: `☕|🍷|🍵|🥃`,
        // subtitle: 'Greetings',
        body: this.notificationsGreedings[Math.floor(Math.random() * this.notificationsGreedings.length)],
        sound: true,
        color: "#ffffff",
        data: {
          to: 'new-log'
        }
      },
      trigger: {
        hour: 21,
        minute: 0,
        repeats: true
      },
    });

    await Notifications.scheduleNotificationAsync({
      identifier: 'forgetmenot-2',
      content: {
        title: `☕|🍷|🍵|🥃`,
        // subtitle: 'Greetings',
        body: this.notificationsGreedings[Math.floor(Math.random() * this.notificationsGreedings.length)],
        sound: true,
        color: "#ffffff",
        data: {
          to: 'new-log'
        }
      },
      trigger: {
        seconds: parseInt((this.triggerr.getTime() - Date.now()) / 1000) + 2 * 60 * 60
      },
    });

    await Notifications.scheduleNotificationAsync({
      identifier: 'forgetmenot-3',
      content: {
        title: `☕|🍷|🍵|🥃`,
        // subtitle: 'Greetings',
        body: this.notificationsGreedings[Math.floor(Math.random() * this.notificationsGreedings.length)],
        sound: true,
        color: "#ffffff",
        data: {
          to: 'new-log'
        }
      },
      trigger: {
        seconds: parseInt((this.triggerr.getTime() - Date.now()) / 1000) + 5 * 60 * 60
      },
    });

    await Notifications.scheduleNotificationAsync({
      identifier: 'forgetmenot-4',
      content: {
        title: `☕|🍷|🍵|🥃`,
        // subtitle: 'Greetings',
        body: this.notificationsGreedings[Math.floor(Math.random() * this.notificationsGreedings.length)],
        sound: true,
        color: "#ffffff",
        data: {
          to: 'new-log'
        }
      },
      trigger: {
        seconds: parseInt((this.triggerr.getTime() - Date.now()) / 1000) + 13 * 60 * 60
      },
    });

    await Notifications.getAllScheduledNotificationsAsync().then(allNotifications => { console.log(allNotifications); })
  }

  triggerr = new Date()
  scheduleNotificationsbefore = () => {
    if (new Date(Date.now()).setHours(21, 0, 0, 0) <= Date.now() && Date.now() <= new Date(Date.now()).setHours(23, 59, 59, 999)) {
      this.triggerr = new Date(new Date(Date.now()).setHours(21, 0, 0, 0) + 24 * 60 * 60 * 1000)
      console.log('next day')
    } else {
      console.log('that day')
      this.triggerr = new Date(new Date(Date.now()).setHours(21, 0, 0, 0))
    }
    this.scheduleNotifications()
    // showmust = parseInt((this.trigger.getTime() - Date.now()) / 1000)
    // console.log('Ustawiono powiadomienie od ', showmust, this.trigger.toString())
  }
  LogDate = new Date()
  calcLogDate = () => {
    if (new Date(Date.now()).setHours(0, 0, 0, 0) <= Date.now() && Date.now() <= new Date(Date.now()).setHours(20, 59, 59, 999)) {
      this.LogDate = new Date(new Date(Date.now()) - 24 * 60 * 60 * 1000)
    } else {
      this.LogDate = new Date(new Date(Date.now()))
    }
    this.scheduleNotifications(this.LogDate)
  }

  colors = {
    wine: ['#E64C98', '#B33B76', '#8C2E5A'],
    coffiee: ['#3FBFC0', '#407FC0', '#403FC0'],
    rum: ['#F2C42B', '#BF7F3F', '#BF3F3E'],
    greentea: ['#7EBF3F', '#56A637', '#236c23']
  }

  state = {
    strenght: {
      wine: 0,
      coffiee: 0,
      rum: 0,
      greentea: 0
    },
    showUsernameEntry: false,
    userEntry: '',
    animation: new Animated.Value(0),
    animation2: new Animated.Value(0),
    Quote: 'loading..',
    AcceptAvailable: false,
  };


  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('username')
      if (value != null && value != '') {
        this.state.userEntry = value;
        this.setState({ color: "blue" })
      }
      else {
        this.state.showUsernameEntry = true;
        this.setState({ color: "blue" })
      }
    } catch (e) {
      // console.log(e);
    }
  }

  setUser = async (user) => {
    try {
      await AsyncStorage.setItem('username', user)
    } catch (e) {
      // saving error
    }
  }

  checkNick = async () => {
    if (this.state.userEntry == '' && !this.state.showUsernameEntry) {
      this.getUser();
    }
  }

  getCurrentDate = () => {
    this.calcLogDate()
    let [month, date, year] = this.LogDate.toLocaleDateString("en-US").split("/")
    let [hour, minute, second] = this.LogDate.toLocaleTimeString("en-US").split(/:| /)
    return '20' + year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  }

  onChangeText = (e) => {
    this.state.userEntry = e.toString();
    this.setState({ color: "blue" })
  }

  handlePress = (e) => {
    this.setState({ color: "blue" })
    this.state.strenght[e] = (this.state.strenght[e] + 1) % 3;
    console.log('Clicked', e, this.state.strenght[e]);
  }

  handleLongPress = (e) => {
    this.state.strenght[e] = 0;
    console.log('ClickedLong', e, this.state.strenght[e]);
    this.forceUpdate();
  }

  handleAccept = () => {
    if (this.state.showUsernameEntry) {
      console.log('Username:', this.state.userEntry);
      this.state.showUsernameEntry = false;
      this.setUser(this.state.userEntry);
      this.setState({ color: "blue" })
    } else {
      for (let prop in this.state.strenght) {
        if (this.state.strenght[prop] != 0) {
          let dataprep = {
            'date': this.getCurrentDate().toString(),
            'nick': this.state.userEntry,
            'wine': this.state.strenght.wine.toString(),
            'coffiee': this.state.strenght.coffiee.toString(),
            'rum': this.state.strenght.rum.toString(),
            'greentea': this.state.strenght.greentea.toString()
          }
          axios.post(API_KEY, dataprep)
            .then(response => {
              console.log(response);
              if (response.status == 200) {
                this.handleAnimation();
                this.scheduleNotificationsbefore()
                this.lockAccept()
              }
            })

          console.log('(' + this.getCurrentDate() + ') Accepted:', this.state.strenght);
          this.state.strenght.wine = 0;
          this.state.strenght.coffiee = 0;
          this.state.strenght.rum = 0;
          this.state.strenght.greentea = 0;
          break;
        }
      }
      this.setState({ color: "red" })
    }
  }

  handleAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 1250,
        useNativeDriver: false
      }).start(({ finished }) => {
        console.log('end of anim')
        this.setState({ AcceptAvailable: false });
      })
    })
  }
  handleAnimation2 = () => {
    Animated.timing(this.state.animation2, {
      toValue: 1,
      duration: 10,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(this.state.animation2, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start()
    })
  }
  boxInterpolation = this.state.animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["#EEEEEE", "#02B201", '#939393']
  })

  boxInterpolation2 = this.state.animation2.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EEEEEE", "#02B201"]
  })
  ///////////////////////////////////////////////////////////////////
  checkQuoteAcceptDate = async () => {
    try { //QUOTE Check
      const date_to_change_quote = await AsyncStorage.getItem('date_to_change_quote')
      console.log(date_to_change_quote);
      console.log(Date.now() > new Date(Date.parse(date_to_change_quote)));
      if ((date_to_change_quote == null) || (Date.now() > new Date(Date.parse(date_to_change_quote)))) {

        fetch('https://api.quotable.io/random')
          .then((response) => response.json())
          .then(data => {
            this.setState({ Quote: data.content + ' ~' + data.author });

            if (new Date(Date.now()).setHours(21, 0, 0, 0) <= Date.now() && Date.now() <= new Date(Date.now()).setHours(23, 59, 59, 999)) {
              AsyncStorage.setItem('date_to_change_quote', (new Date(new Date(Date.now()).setHours(21, 0, 0, 0) + 24 * 60 * 60 * 1000)).toString())
            } else {
              AsyncStorage.setItem('date_to_change_quote', (new Date(new Date(Date.now()).setHours(21, 0, 0, 0)).toString()))
            }

            try {
              AsyncStorage.setItem('quote', this.state.Quote)
            } catch (e) {
              // saving error
            }

          });

        this.setState({ Quote: value });
      }
      else {
        const quote = await AsyncStorage.getItem('quote')
        this.setState({ Quote: quote });
      }
    } catch (e) {
      // console.log(e);
    }
    try { //ACCEPT Check
      const date_to_change_accept = await AsyncStorage.getItem('date_to_change_accept')
      console.log(date_to_change_accept);
      if ((date_to_change_accept == null) || (Date.now() > new Date(Date.parse(date_to_change_accept)))) {
        this.setState({ AcceptAvailable: true });
      }
    } catch (e) {

    }

  }

  lockAccept = async () => {
    // this.setState({ AcceptAvailable: false });

    if (new Date(Date.now()).setHours(21, 0, 0, 0) <= Date.now() && Date.now() <= new Date(Date.now()).setHours(23, 59, 59, 999)) {
      AsyncStorage.setItem('date_to_change_accept', (new Date(new Date(Date.now()).setHours(21, 0, 0, 0) + 24 * 60 * 60 * 1000)).toString())
    } else {
      AsyncStorage.setItem('date_to_change_accept', (new Date(new Date(Date.now()).setHours(21, 0, 0, 0)).toString()))
    }
  }

  componentDidMount = () => {
    // Not working
    // AsyncStorage.removeItem('date_to_change_accept')
    // AsyncStorage.removeItem('quote')
    // AsyncStorage.removeItem('date_to_change_quote')
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    this.checkQuoteAcceptDate()
    // this.scheduleNotificationsbefore()
    // console.log(Notifications.getAllScheduledNotificationsAsync.toString())
  }

  render() {
    this.checkNick();
    return (
      <View style={[styles.container]}>
        <View style={[styles.topMenu], {}}>
          <TouchableWithoutFeedback onPress={() => { this.setUser(''); this.state.userEntry = ''; this.setState({ color: "red" }) }}>
            <Text style={[{ fontSize: 0.035 * Dimensions.get('window').width }]}> {this.state.userEntry} </Text>
          </TouchableWithoutFeedback>
        </View >
        {!this.state.showUsernameEntry &&
          <TouchableWithoutFeedback onLongPress={() => { this.handleAnimation2(); Clipboard.setString(this.state.Quote) }}>
            <View style={[styles.quotecontainer]}>
              <Animated.Text style={[{ fontSize: 0.045 * Dimensions.get('window').width, color: this.boxInterpolation2 }]}> {this.state.Quote} </Animated.Text>
            </View>
          </TouchableWithoutFeedback>}
        <View style={[styles.iconscont]}>
          <TouchableHighlight activeOpacity={1} onPress={() => this.handlePress('coffiee')} onLongPress={() => this.handleLongPress('coffiee')} underlayColor='#2F2F8D' style={[styles.iconadiv, styles.iconaround1, {}, { backgroundColor: this.colors.coffiee[this.state.strenght.coffiee] }, { borderColor: this.state.strenght.coffiee > 0 ? '#EEEEEE' : 'black' }]}>
            <Image source={require("./icons/coffee-cup.png")} style={styles.icona} />
          </TouchableHighlight >
          <TouchableHighlight onPress={() => this.handlePress('wine')} onLongPress={() => this.handleLongPress('wine')} underlayColor='#591D39' style={[styles.iconadiv, styles.iconaround2, { backgroundColor: this.colors.wine[this.state.strenght.wine] }, { borderColor: this.state.strenght.wine > 0 ? '#EEEEEE' : 'black' }]}>
            <Image source={require("./icons/wine.png")} style={styles.icona} />
          </TouchableHighlight >
          <TouchableHighlight onPress={() => this.handlePress('greentea')} onLongPress={() => this.handleLongPress('greentea')} underlayColor='#113811' style={[styles.iconadiv, styles.iconaround3, { backgroundColor: this.colors.greentea[this.state.strenght.greentea] }, { borderColor: this.state.strenght.greentea > 0 ? '#EEEEEE' : 'black' }]}>
            <Image source={require("./icons/green-tea.png")} style={styles.icona} />
          </TouchableHighlight >
          <TouchableHighlight onPress={() => this.handlePress('rum')} onLongPress={() => this.handleLongPress('rum')} underlayColor='#8C2E2C' style={[styles.iconadiv, styles.iconaround4, { backgroundColor: this.colors.rum[this.state.strenght.rum] }, { borderColor: this.state.strenght.rum > 0 ? '#EEEEEE' : 'black' }]}>
            <Image source={require("./icons/rum.png")} style={styles.icona} />
          </TouchableHighlight >
        </View>
        {this.state.showUsernameEntry && < View style={[[styles.acceptCont], {}]}>
          <TextInput
            style={[styles.buttonAccept, { fontSize: 0.07 * Dimensions.get('window').width }]}
            onChangeText={this.onChangeText}
            value={this.state.userEntry}
            placeholder="Yr nick"
            autoFocus={true}
            textAlign='center'
          />
        </View>}
        <View style={[styles.acceptCont]}>
          <TouchableHighlight underlayColor='#8C2E2C' onPress={() => this.handleAccept()} style={[styles.buttonAccept]} disabled={!this.state.AcceptAvailable}>
            <Animated.View style={[styles.vievAccepted, { backgroundColor: this.state.AcceptAvailable ? this.boxInterpolation : '#939393' }]}>
              <Text style={[styles.textAccept, { color: this.state.AcceptAvailable ? 'black' : '#2A2A2A' }]}>Accepted !</Text>
            </Animated.View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: '#222222',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center'

  },
  iconscont: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    height: Dimensions.get('window').width * 0.8,
    width: Dimensions.get('window').width * 0.8,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '2%',
    alignContent: 'center',
    padding: 0

  },
  icona: {
    // ,
    width: '100%',
    height: "100%",

  },
  iconadiv: {
    width: '50%',
    height: "50%",

    borderColor: 'black',
    borderWidth: 2,
    margin: 0,

  },
  iconaround1: {
    borderTopLeftRadius: 10,
    padding: 10,
  },
  iconaround2: {
    borderTopRightRadius: 10,
    padding: 15,
  },
  iconaround3: {
    borderBottomLeftRadius: 10,
    padding: 10,
  },
  iconaround4: {
    borderBottomRightRadius: 10,
    padding: 10,
  },
  touch: {
    width: '100%',
    height: "100%",

  },
  acceptCont: {
    borderRadius: 10,
    height: Dimensions.get('window').width * 0.12,
    width: Dimensions.get('window').width * 0.8,
    margin: '2%',
    padding: 0
  },
  buttonAccept: {
    backgroundColor: '#EEEEEE',
    width: "100%",
    borderRadius: 10,
    height: "100%",
  },
  vievAccepted: {
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    height: '100%',
    width: "100%",
  },
  textAccept: {
    fontSize: 0.07 * Dimensions.get('window').width,
  },
  quotecontainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'tomato',
    width: '100%',
    padding: '8 %',
    // height: '100%',
  },
  topMenu: {
    width: Dimensions.get('window').width,
    // height: '5%'
  }
});

