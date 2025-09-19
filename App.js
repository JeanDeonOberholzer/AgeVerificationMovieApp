import * as React from "react";
import { useState } from "react";

import {
  SafeAreaView,      // Keeps content within a safe area
  View,              // A container 
  Text,              // Displays text
  TextInput,         // Input box for user typing
  Pressable,         // Button-like touch area
  StyleSheet,        // Lets us write styles separately
  Alert,             // Shows a pop-up alert
  Platform,          // Detects if we’re on iOS/Android/Web
  KeyboardAvoidingView, // Pushes content up when keyboard is open
} from "react-native";

export default function App() {


  // Which screen are we on? 
  const [screen, setScreen] = useState("age");

  // Age screen values
  const [ageText, setAgeText] = useState("");   // what user typed
  const [ageError, setAgeError] = useState(""); // error message for age screen

  // Movie screen values
  const movies = [
    "Superbad",
    "The Hangover",
    "Sausage Party",
    "Ted",
    "Borat",
  ];
  const [choiceText, setChoiceText] = useState(""); // what user typed for movie choice
  const [choiceError, setChoiceError] = useState(""); // error message for movie screen
  const [selected, setSelected] = useState(null);     // which movie they chose

  // resets movie state when entering the movie screen
  const resetMovieState = () => {
    setChoiceText("");
    setChoiceError("");
    setSelected(null);
  };

  // checks the age input
  const checkAge = () => {
    setAgeError(""); // clear any old error

    const trimmed = ageText.trim();      // remove spaces around input
    const age = parseInt(trimmed, 10);   // convert string to number

    // these are the validation steps
    if (!trimmed) {
      setAgeError("Please enter your age.");
      return;
    }
    if (Number.isNaN(age)) {
      setAgeError("Age must be a number.");
      return;
    }
    if (age < 0 || age > 120) {
      setAgeError("Enter a realistic age between 0 and 100.");
      return;
    }
    if (age <= 18) {
      setAgeError("You are not over 18.");
      return;
    }
    if (age > 21) {
      // Passed all rules: go to movies screen
      resetMovieState();
      setScreen("movies");
      return;
    }
    // For ages 19–21: not allowed to continue
    setAgeError("You are over 18 but not over 21, so you can’t continue.");
  };

  // checks the movie choice input
  const chooseMovie = () => {
    setChoiceError(""); // clear any old error

    const trimmed = choiceText.trim();
    const n = parseInt(trimmed, 10);

    if (!trimmed) {
      setChoiceError("Please enter a number from 1 to 5.");
      return;
    }
    if (Number.isNaN(n)) {
      setChoiceError("That is not a number. Enter 1–5.");
      return;
    }
    if (n < 1 || n > movies.length) {
      setChoiceError(`Please enter a number between 1 and ${movies.length}.`);
      return;
    }

    // valid choice
    const movie = movies[n - 1];
    setSelected(movie);
    Alert.alert("Movie Selected", `You chose: ${movie}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        
        {screen === "age" ? (
          <View style={styles.card}>
            <Text style={styles.title}>Age Check</Text>
            <Text style={styles.subtitle}>
              You must be <Text style={styles.bold}>over 18</Text>. Only if you are{" "}
              <Text style={styles.bold}>over 21</Text> may you continue.
            </Text>

          
            <TextInput
              style={styles.input}
              placeholder="Type your age"
              placeholderTextColor="#9aa0a6"
              value={ageText}
              onChangeText={setAgeText}
              keyboardType="number-pad" // opens number keyboard on mobile
              inputMode="numeric"       // helps on web too
              maxLength={3}
            />

          
            {ageError ? <Text style={styles.error}>{ageError}</Text> : null}

          
            <Pressable style={styles.button} onPress={checkAge}>
              <Text style={styles.buttonText}>Check Age</Text>
            </Pressable>
          </View>
        ) : (
        
          <View style={styles.card}>
            <Text style={styles.title}>Choose a Movie</Text>
            <Text style={styles.subtitle}>Type a number from 1–5:</Text>

          
            <View style={{ marginVertical: 8 }}>
              {movies.map((m, i) => (
                <Text key={m} style={styles.option}>
                  {i + 1}. {m}
                </Text>
              ))}
            </View>

        
            <TextInput
              style={styles.input}
              placeholder="Enter 1–5"
              placeholderTextColor="#9aa0a6"
              value={choiceText}
              onChangeText={setChoiceText}
              keyboardType="number-pad"
              inputMode="numeric"
              maxLength={1}
            />

        
            {choiceError ? <Text style={styles.error}>{choiceError}</Text> : null}

          
            {selected ? (
              <Text style={styles.info}>Current selection: {selected}</Text>
            ) : null}

    
            <Pressable style={styles.button} onPress={chooseMovie}>
              <Text style={styles.buttonText}>Confirm Choice</Text>
            </Pressable>

          
            <Pressable
              style={[styles.button, { backgroundColor: "#374151", marginTop: 8 }]}
              onPress={() => setScreen("age")}
            >
              <Text style={[styles.buttonText, { color: "#e5e7eb" }]}>
                Back to Age Screen
              </Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0f172a", // dark background
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#111827",
    borderColor: "#1f2937",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  title: {
    color: "#e5e7eb",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#cbd5e1",
    textAlign: "center",
  },
  bold: { fontWeight: "800", color: "#22d3ee" },
  input: {
    backgroundColor: "#0b1220",
    color: "#e5e7eb",
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#22d3ee",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: { fontWeight: "800", color: "#0b1220" },
  error: { color: "#ef4444", textAlign: "center", fontWeight: "700" },
  info: { color: "#22d3ee", textAlign: "center", fontWeight: "700" },
  option: { color: "#e5e7eb", fontSize: 16, textAlign: "center", marginVertical: 2 },
});

