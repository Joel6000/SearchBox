import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './MainRoute';

const Main = () => {
    return (
        <NavigationContainer>
            <MainRoute/>
        </NavigationContainer>

    );
};

export default Main;