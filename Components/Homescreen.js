import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {TextInput, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  addBill,
  editDone,
  setBill,
  setLoading,
  doneLoading,
} from '../actions/BillActions';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import NetworkComponent from './NetworkComponent';

const initialBill = {
  description: '',
  category: '',
  amount: '',
};

const Modal = {
  stack: {
    children: [
      {
        component: {
          name: 'NetworkModal',
        },
      },
    ],
  },
};

const overlay = {
  component: {
    name: 'NetworkModal',
    options: {
      layout: {
        componentBackgroundColor: 'transparent',
      },
      overlay: {
        interceptTouchOutside: true,
      },
    },
  },
};

const HomeScreen = ({
  componentDetail,
  bills,
  billBeingEdited,
  addBill,
  isEdit,
  editDone,
  setBill,
}) => {
  const [data, setData] = useState(isEdit ? billBeingEdited : initialBill);
  const [isConnected, setIsConnected] = useState(true);

  const submitHandler = () => {
    if (data.description === '' || data.category === '' || isNaN(data.amount))
      alert('Please enter correct values');
    else {
      // setIsloading(true);
      if (isEdit) {
        let newBills = bills.map(b => {
          if (b.key === data.key) return {...data};
          else return {...b};
        });
        firestore()
          .doc('awesome_project/bills')
          .set({Bills: [...newBills]});
        // .then(() => setIsloading(false));
        editDone(newBills);
        setData(initialBill);
      } else {
        firestore()
          .doc('awesome_project/bills')
          .update({
            Bills: firestore.FieldValue.arrayUnion({
              key: bills.length + 1,
              ...data,
            }),
          });
        // .then(() => setIsloading(false));
        addBill({key: bills.length + 1, ...data});
        setData(initialBill);
      }
      Navigation.push(componentDetail.componentId, {
        component: {
          name: 'List',
        },
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const billData = await firestore()
        .collection('awesome_project')
        .doc('bills')
        .get();
      setBill(billData._data.Bills);
    }
    fetchData();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (isConnected === false) Navigation.showOverlay(overlay);
      else Navigation.dismissAllOverlays();
      if (Platform.OS === 'ios') {
        console.log('Connection type - ios :', state.type);
        console.log('Is connected? - ios : ', state.isConnected);
      } else {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
      }
    });
    setData(isEdit ? billBeingEdited : initialBill);
    return () => unsubscribe(); //eslint-disable-next-line
  }, [isConnected]);

  return (
    <View style={styles.root}>
      <View style={[styles.container, styles.elevation, styles.shadowProp]}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#313b6b',
            paddingVertical: 10,
          }}>
          Enter Bill Details
        </Text>
        <TextInput
          label="Enter Bill"
          value={data.description}
          type="outlined"
          onChangeText={text => setData({...data, description: text})}
          style={styles.input}
        />
        <TextInput
          label="Enter Category"
          value={data.category}
          type="outlined"
          style={styles.input}
          onChangeText={text => setData({...data, category: text})}
        />
        <TextInput
          label="Enter Amount"
          value={data.amount}
          type="outlined"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={text => setData({...data, amount: text})}
        />
        <Button
          mode=" contained"
          color="white"
          style={[styles.button, styles.elevation, styles.shadowProp]}
          onPress={() => submitHandler()}>
          {isEdit ? 'Edit' : 'Submit'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
    backgroundColor: '#5f6caf',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    paddingVertical: 50,
    borderRadius: 15,
  },
  elevation: {
    elevation: 20,
    shadowColor: 'black',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    width: '90%',
    margin: 10,
    borderRadius: 10,
  },
  button: {
    marginTop: 25,
    padding: 5,
    backgroundColor: '#5f6caf',
  },
});

const mapStateToProps = state => ({
  bills: state.bills,
  billBeingEdited: state.billBeingEdited,
  isEdit: state.isEdit,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, {
  addBill,
  editDone,
  setBill,
  setLoading,
  doneLoading,
})(HomeScreen);
