import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import BillComponent from './BillComponent';
import {Keyboard} from 'react-native';
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Snackbar,
} from 'react-native-paper';
import {
  clearSelection,
  changeBudget,
  clearBudget,
  deleteBills,
  editPayablesList,
} from '../actions/BillActions';

const BillListScreen = ({
  componentDetail,
  bills,
  selected,
  monthly_budget,
  clearSelection,
  changeBudget,
  clearBudget,
  deleteBills,
  editPayablesList,
  payableBills,
}) => {
  const [billList, setBillList] = useState(bills);

  //budget controllers
  const [budget, setBudget] = useState(
    monthly_budget === 0 ? '' : monthly_budget,
  );

  const budgetHandler = () => {
    if (isNaN(budget)) alert('Please enter correct values');
    else {
      if (monthly_budget === 0) {
        changeBudget(budget);
        if (budget > 0) onPopUpSnackBar();
      } else {
        clearBudget();
        onDismissSnackBar();
        setBudget('');
      }
      Keyboard.dismiss();
    }
  };

  //delete pop up controller
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const deleteHandler = () => {
    const updatedBills = billList.filter(bill => !selected.includes(bill.key));
    if (billList) deleteBills(updatedBills);
    setBillList(updatedBills);
    hideDialog();
  };

  const cancelHandler = () => {
    clearSelection();
    hideDialog();
  };

  //pay snackbar controllers
  const [snackVisible, setSnackVisible] = useState(false);
  const onPopUpSnackBar = () => setSnackVisible(true);
  const onDismissSnackBar = () => setSnackVisible(false);

  //payment controllers
  function SortByAmount(first, second) {
    if (parseInt(second.amount) < parseInt(first.amount)) {
      return 1;
    }
    if (parseInt(second.amount) > parseInt(first.amount)) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const MaxPayableBills = () => {
      let billsList = [...billList];
      billsList.sort(SortByAmount);
      let sum = 0;
      let payables = [];
      for (let i = 0; i < billsList.length; i++) {
        if (sum + parseInt(billsList[i].amount) <= monthly_budget) {
          sum = sum + parseInt(billsList[i].amount);
          payables.push(billsList[i].key);
        }
      }
      editPayablesList(payables);
    };
    MaxPayableBills();
  }, [monthly_budget, bills, editPayablesList]);

  const payHandler = () => {
    let amountLeft = monthly_budget;
    let remainingBills = [];
    for (let i = 0; i < bills.length; i++) {
      if (payableBills.includes(bills[i].key))
        amountLeft -= parseInt(bills[i].amount);
      else remainingBills.push({...bills[i]});
    }
    deleteBills(remainingBills);
    console.log(remainingBills);
    changeBudget(amountLeft);
    onDismissSnackBar();
    setBillList(remainingBills);
    setBudget(amountLeft.toString());
  };

  return (
    <Provider>
      <View style={styles.root}>
        <View style={styles.budgetInput}>
          <TextInput
            label="Enter Budget"
            value={budget}
            type="outlined"
            onChangeText={text => setBudget(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button
            mode=" contained"
            color="white"
            style={[styles.button, styles.elevation, styles.shadowProp]}
            onPress={() => budgetHandler()}>
            {monthly_budget === 0 ? 'Submit' : 'Cancel'}
          </Button>
        </View>
        <FlatList
          data={billList}
          renderItem={bill => (
            <BillComponent
              componentDetail={componentDetail}
              bill={bill.item}
              showDialog={showDialog}
              color={
                payableBills.includes(bill.item.key) ? '#8adceb' : 'whitesmoke'
              }
            />
          )}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={{color: '#db4b4b'}}>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to delete the bill?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={cancelHandler}
                color="white"
                style={{backgroundColor: '#8c8787', marginHorizontal: 10}}>
                Cancel
              </Button>
              <Button
                color="white"
                onPress={deleteHandler}
                style={{backgroundColor: '#db4b4b', marginHorizontal: 10}}>
                Delete
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Snackbar
          visible={snackVisible}
          onDismiss={onDismissSnackBar}
          duration={60000}
          action={{
            label: 'Pay Bills',
            onPress: () => {
              payHandler();
            },
          }}>
          Do you Want to pay these ? Otherwise click cancel!
        </Snackbar>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
  },
  budgetInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '50%',
    margin: 30,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#5f6caf',
  },
});

const mapStateToProps = state => ({
  bills: state.bills,
  selected: state.selected,
  monthly_budget: state.monthly_budget,
  payableBills: state.payableBills,
});

export default connect(mapStateToProps, {
  clearSelection,
  changeBudget,
  clearBudget,
  deleteBills,
  editPayablesList,
})(BillListScreen);
