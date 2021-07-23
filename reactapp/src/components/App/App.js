import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import YoutubePlayer from '../../pages/youtube_player/index'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={() => <YoutubePlayer/>} />
            </BrowserRouter>
        )
    }
}

export default App;
