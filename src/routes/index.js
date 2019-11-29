import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import LoadScreen from '../pages/Load';
import OverViewScreen from '../pages/Overview';
import StoryScreen from '../pages/Story';

const MainRouter = createStackNavigator({
    load: {screen: LoadScreen},
    overview: {screen: OverViewScreen},
    story: {screen: StoryScreen}
},{
    header: null,
    initialRouteName: 'overview'
}
);

export default MainRouter;
