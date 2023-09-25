// Importing necessary modules from react and react-native libraries
import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

// Declaring a class-based component named "App"
class App extends Component {
    // A constructor is the first thing that runs when a component is created.
    // It's primarily used to set up state and other initial values.
    constructor() {
        super(); // Calling the constructor of the parent class "Component"

        // Initializing the state, it’s like a data store to the component,
        // where the data can be mutated without affecting the rest of the app.
        this.state = {
            screen: 'home', // Keeping track of the currently displayed screen
            // Variables to store the user's response for each question
            exercise: '',
            sleep: '',
            diet: '',
            stress: '',
            // Variables to store the summary information
            participants: 0,
            totalExercise: 0,
            totalSleep: 0,
            balancedDietCount: 0
        };
    }

    // Method to handle the submission of the survey form
    handleSubmission = () => {
        // Updating state variables based on user's input
        // Using the previous state to calculate new values and update them
        this.setState(prevState => ({
            // Incrementing participants count for each submission
            participants: prevState.participants + 1,

            // Calculating and updating total exercise and sleep hours
            totalExercise: prevState.totalExercise + Number(this.state.exercise),
            totalSleep: prevState.totalSleep + Number(this.state.sleep),

            // Checking user's response to the diet question and updating balancedDietCount accordingly
            balancedDietCount: prevState.balancedDietCount + (this.state.diet.toLowerCase() === 'yes' ? 1 : 0),

            // Navigating to the summary screen after submission
            screen: 'summary'
        }));

        // Resetting the state variables for user's input after submission
        this.setState({ exercise: '', sleep: '', diet: '', stress: '' });
    }

    // render method is mandatory in class components and returns the JSX to be rendered.
    render() {
        // Conditionally rendering screens based on the value of this.state.screen
        if (this.state.screen === 'home') {
            // Returning the JSX for the home screen
            return (
                <View>
                    <Text>Welcome to the Lifestyle Survey!</Text>
                    {/* Button to navigate to the survey screen by updating the screen state */}
                    <Button title="Start Survey" onPress={() => this.setState({ screen: 'survey' })} />
                </View>
            );
        } else if (this.state.screen === 'survey') {
            // Returning the JSX for the survey screen
            return (
                <View>
                    <Text>How many hours do you exercise in a week?</Text>
                    {/* TextInput to take user's input for the exercise question, updating the exercise state on text change */}
                    <TextInput value={this.state.exercise} onChangeText={(text) => this.setState({ exercise: text })} keyboardType="numeric" />

                    {/* Similarly for other questions */}

                    {/* Button to submit the form, calling handleSubmission method on press */}
                    <Button title="Submit" onPress={this.handleSubmission} />
                </View>
            );
        } else if (this.state.screen === 'summary') {
            // Returning the JSX for the summary screen
            return (
                <View>
                    {/* Displaying the summary information calculated in handleSubmission method */}
                    <Text>Total Participants: {this.state.participants}</Text>
                    <Text>Average Exercise: {this.state.totalExercise / this.state.participants} hours/week</Text>

                    {/* Other Summary Information */}

                    {/* Button to navigate back to the home screen by updating the screen state */}
                    <Button title="Go to Home" onPress={() => this.setState({ screen: 'home' })} />
                </View>
            );
        }
    }
}

// Exporting the App component to be used in other files
export default App;
