import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SignIn from './src/pages/SignIn/Index';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='#1d1d2e' barStyle='light-content' translucent={false} /*barStyle: cores dos icones | trasnlucent: se os components da tela podem ficar abaixo da status bar*/ />
      <SignIn/>
    </>
  );
}