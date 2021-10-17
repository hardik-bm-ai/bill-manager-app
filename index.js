import React from 'react';
import {Navigation} from 'react-native-navigation';
import HomeScreen from './Components/Homescreen';
import BillListScreen from './Components/BillListScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './store';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5f6caf',
    accent: 'white',
  },
};

const HomeThemedScreen = props => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <HomeScreen componentDetail={props} />
      </Provider>
    </PaperProvider>
  );
};

HomeThemedScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
    icon: require('./assets/home.png'),
  },
};

const BillListThemedScreen = props => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <BillListScreen componentDetail={props} />
      </Provider>
    </PaperProvider>
  );
};

BillListThemedScreen.options = {
  topBar: {
    title: {
      text: 'List',
    },
  },
  bottomTab: {
    text: 'Bills',
    icon: require('./assets/clipboard.png'),
  },
};

Navigation.registerComponent('Home', () => HomeThemedScreen);
Navigation.registerComponent('List', () => BillListThemedScreen);

const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Home',
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'List',
                },
              },
            ],
          },
        },
      ],
    },
  },
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#5f6caf',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#5f6caf',
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(mainRoot);
});
