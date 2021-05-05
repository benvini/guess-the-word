import {Platform} from 'react-native';

const appEnvironments = {
    local: 'http://localhost:3000/'
};

if (Platform.OS === 'android') {
    appEnvironments.local = 'http://10.0.2.2:3000/';
}

const apiHost = appEnvironments['local'];

export {
    apiHost
};
