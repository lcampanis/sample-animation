import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";

const AccountPicker = ({ value, onValueChange }) => {
  return (
    <View style={styles.picker}>
      <Text>{value}</Text>
    </View>
  );
};

const handlePickerChange = (newValue) => {}

const Account = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { accountName } = route.params || {};

  // Set up the account picker in the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AccountPicker value={accountName} onValueChange={handlePickerChange} />
        </View>
      ),
    });
  }, [navigation, accountName]);

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 120 }}>
      <Text>Total balance</Text>
      <Text size="2xl">$0.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderRadius: 50,
    backgroundColor: "#fff",
    padding: 10,
  }
});

export default Account;
