import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { User, AuthError } from "firebase/auth/react-native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { initialize } from "../../config/firebase";

const { signInWithEmailAndPassword, auth, onAuthStateChanged, signOut } =
  initialize();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setError(null);
    }

    setUser(user);
  });

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password).catch((e: AuthError) => {
      setError(e.message);
    });
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      {user ? <Text>{user.displayName}</Text> : <Text>Not Logged in</Text>}
      <View>
        <TextInput value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {!user ? (
          <TouchableOpacity onPress={handleLogin}>
            <Text>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => signOut(auth)}>
            <Text>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);