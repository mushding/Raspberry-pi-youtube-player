import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import YoutubePlayer from '../../pages/youtube_player/index'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={() => <Redirect to="/player" />} />
                <Route exact path="/player" render={() => <YoutubePlayer/>}/>
            </BrowserRouter>
        )
    }
}

export default App;
