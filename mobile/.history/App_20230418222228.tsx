import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor='#1d1d2e' barStyle='light-content' translucent={false} /*barStyle: cores dos icones | trasnlucent: se os components da tela podem ficar abaixo da status bar*/ />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
