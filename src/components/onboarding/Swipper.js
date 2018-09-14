import { Image, Text,  StyleSheet, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { StackNavigator } from 'react-navigation';
import React from 'react';
import { getUserToken } from '../../utils/storage';

export default class Swipper extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
        super(props);
        this.state = {
          isFinishedLoading: false,
        };
    }

  componentWillMount() {
    const { navigate } = this.props.navigation;
    getUserToken().then((token) => {
                console.log(token);
                if (token == null) {
                    this.setState({
                      isFinishedLoading: true,
                    });
                    return;
                } else {
                    console.log(token);
                    console.log("xd");
                    navigate('Home');
                }
            });
  }




  render() {
    if (this.state.isFinishedLoading == false) {
      return (
        <View/>
        );
    }
    return (
      <Onboarding

    skipLabel = {'Omitir'}
    nextLabel = {'Siguiente'}

    onSkip = {() => this.props.navigation.navigate('BodyOptionRegister')}
    onDone = {() => this.props.navigation.navigate('BodyOptionRegister')}
    
    pages={[
      {
        backgroundColor: '#F5822B',
        image: <Image source={require('../../images/explora.png')} />,
        title: <Text style= {styles.title}> EXPLORA </Text>,
        subtitle: <Text style= {styles.subtitle}>{'Los mejores establecimientos\nen un solo lugar'}</Text>,
      },


      {
        backgroundColor: '#963C97',
        image: <Image source={require('../../images/planea.png')} />,
        title: <Text style= {styles.title}> PLANEA </Text>,
        subtitle: <Text style= {styles.subtitle}>{'Reserva estacionamientos y encuentra\ndirecciones a cualquier tienda'}</Text>,
      },
      {
        backgroundColor: '#008285',
        image: <Image source={require('../../images/disfruta.png')} />,
        title: <Text style= {styles.title}> DISFRUTA </Text>,
        subtitle: <Text style= {styles.subtitle}>{'Acumula puntos, sube de nivel\n y accede a descuentos exclusivos'}</Text>,
      },
    ]}
  />
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'  
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    width: 350,    
    textAlign: 'center',
  },
});
