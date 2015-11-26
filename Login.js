'use strict';

var React = require('react-native');
var authService = require('./AuthService');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Component,
  View,
  ActivityIndicatorIOS
} = React;

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      showProgress: false
    }
  }

  render(){
    var errorCtrl = <View />

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>
    }

    if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>
        An unknown error occurred
      </Text>
    }


    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <TextInput
          onChangeText={(text)=> this.setState({username: text})}
          style={styles.textInput}
          placeholder="Github Username"></TextInput>
        <TextInput
          onChange={(text)=> this.setState({password: text})}
          style={styles.textInput}
          placeholder="Github Password"
          secureTextEntry={true}></TextInput>
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
        />
      </View>
    );
  }

  onLoginPressed(){
    console.log('Attempting to login with username ' + this.state.username);
    this.setState({showProgress: true});

    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results)=> {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
    })
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    padding: 10,
    alignItems: 'center'
  },
  logo: {
    width: 66,
    height: 55
  },
  textInput: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 5,
    color: '#48BBEC'
  },
  button: {
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
    borderRadius: 5,
    marginTop: 40
  },
  buttonText: {
    fontSize: 24,
    color: 'white'
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});

module.exports = Login;
