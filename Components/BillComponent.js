import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {editBill, selectBill} from '../actions/BillActions';
import {Navigation} from 'react-native-navigation';

const BillComponent = ({
  componentDetail,
  bills,
  editBill,
  bill,
  showDialog,
  selectBill,
  color,
}) => {
  const editHandler = key => {
    const billToBeEdited = bills.filter(b => b.key === key);
    editBill(billToBeEdited[0]);
    Navigation.push(componentDetail.componentId, {
      component: {
        name: 'Home',
      },
    });
  };

  const deleteHandler = key => {
    const selected = bills.filter(b => b.key === key);
    console.log(selected);
    selectBill(selected[0].key);
    showDialog();
  };
  return (
    <View style={[styles.billContainer, {backgroundColor: color}]}>
      <View>
        <Text style={styles.title}>{bill.description}</Text>
      </View>
      <View style={styles.subtitle}>
        <Text
          style={{
            fontSize: 15,
            color: '#313b6b',
          }}>{`${bill.category} $${bill.amount}`}</Text>
        <View style={styles.buttonContainer}>
          <View>
            <Button
              color="#5f6caf"
              mode="text"
              onPress={() => editHandler(bill.key)}>
              Edit
            </Button>
          </View>
          <View>
            <Button
              mode="text"
              color="#db4b4b"
              onPress={() => deleteHandler(bill.key)}>
              Delete
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  billContainer: {
    width: '95%',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 2,
    color: '#313b6b',
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  bills: state.bills,
});

export default connect(mapStateToProps, {editBill, selectBill})(BillComponent);
