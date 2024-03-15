import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence, withRepeat, Easing, withDelay
} from 'react-native-reanimated';
import { Button, Heading, FormControl, Input, InputField, ButtonText, Text } from "@gluestack-ui/themed"
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const navigation = useNavigation();

  const [accountName, setAccountName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState();

  // animated success message
  const successMessageOpacity = useSharedValue(1);
  const successMessagePosition = useSharedValue({ x: 0, y: 0 });
  const successMessageStyle = useAnimatedStyle(() => {
    return {
      opacity: successMessageOpacity.value,
      transform: [{ translateX: successMessagePosition.value.x }, { translateY: successMessagePosition.value.y }]
    };
  });

  // animated card
  const rotation = useSharedValue(0);
  const position = useSharedValue({ x: 0, y: 0 });
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ rotateZ: `${rotation.value}deg` }, { scale: scale.value }, { translateX: position.value.x }, { translateY: position.value.y }],
    };
  });

  const handleInputChange = (text) => {
    setAccountName(text);
  };

  const handleSubmit = () => {
    if (accountName) {
      setIsSubmitted(true);

      rotation.value = withSequence(
        withTiming(-10, { duration: 1500, easing: Easing.cubic }),
        withTiming(5, { duration: 1500, easing: Easing.cubic }, () => {
          position.value = withTiming({ x: 20, y: -300 }, { duration: 800, easing: Easing.cubic });
          opacity.value = withTiming(0, { duration: 1000, easing: Easing.cubic });
          scale.value = withTiming(0.5, { duration: 1000, easing: Easing.cubic });

          // Show success message
          successMessageOpacity.value = withTiming(0, { duration: 1500, easing: Easing.cubic });
          successMessagePosition.value = withTiming({ x: 0, y: 600 }, { duration: 1500, easing: Easing.cubic });
        })
      );
      // just before animations complete so we still animation as new screen transitions
      setTimeout(() => {
        navigation.navigate('Account', { accountName });
      }, 3000);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
      <Animated.View style={[styles.card, cardStyle]}>
        <Text style={styles.p}>{accountName || 'Account 4'}</Text>
        <Text style={styles.amount}>$0.00</Text>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(240, 240, 240, 1)']}
          style={styles.gradient}
          start={[0.5, 0]}
        />
      </Animated.View>

      {isSubmitted &&
        <Animated.View style={[{ marginTop: 20 }, successMessageStyle]}>
          <Heading size="2xl" style={styles.heading}>Account created success!</Heading>
          <Text style={styles.p}>Taking you to your new account now...</Text>
        </Animated.View> ||
        <View style={{ marginBottom: 20 }}>
          <Heading size="2xl" style={styles.heading}>Give your account a name</Heading>
          <Text style={styles.p}>Perhaps relating to what you'll use it for.</Text>
          <FormControl minWidth="$80">
            <Input
              style={styles.input}
              paddingLeft={0}
            >
              <InputField
                onChangeText={handleInputChange}
                placeholder="Account 4"
                value={accountName}
                placeholderTextColor="#aaa"
                style={styles.inputField}
              />
            </Input>
          </FormControl>

          <FormControl>
            <Button
              size="lg"
              backgroundColor="#000"
              borderRadius={10}
              onPress={handleSubmit}
              styles={styles.button}
              isDisabled={!accountName}
            >
              <ButtonText>Continue</ButtonText>
            </Button>
          </FormControl>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "50%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    color: "#777",
    backgroundColor: "#fff",
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  amount: {
    color: "#777",
    fontWeight: "bold",
  },
  heading: {
    marginBottom: 20,
  },
  p: {
    color: "#777",
  },
  input: {
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 0,
    padding: 0,
  },
  inputField: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingRight: 0,
  }
});

export default Home;
