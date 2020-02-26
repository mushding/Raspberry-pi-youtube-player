import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {
    Paper,
    IconButton,
    LinearProgress,
} from "@material-ui/core";

const PlayBar = withStyles({
    root: {
        height: 5,
        backgroundColor: '#68fa6a',
    },
    bar: {
        backgroundColor: '#227c23',
    },
})(LinearProgress);

const PauseBar = withStyles({
    root: {
        height: 5,
        backgroundColor: '#fda548',
    },
    bar: {
        backgroundColor: '#e48119',
    },
})(LinearProgress);

const StopBar = withStyles({
    root: {
        height: 5,
        backgroundColor: '#fc5151',
    },
    bar: {
        backgroundColor: '#c22a2a',
    },
})(LinearProgress);

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(4),
    },
    textMargin: {
        fontFamily: 'Helvetica Narrow, sans-serif',
        margin: theme.spacing(2),
    },
    paper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    paperIsPlaying: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: "#68fa6a",
    },
    paperIsPauseing: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: "#fda548",
    },
    paperIsStoping: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: "#fc5151",
    },
    fixedHeight: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        padding: theme.spacing(2),
        margin: '0 auto',
        maxWidth: '1280px',
        width: '90%',
    },
    rowColumn: {
        display: "flex",
        flexDirection: "row",
    },
    textRight: {
        "marginLeft": "auto",
        "padding": theme.spacing(2.5),
    },
    deleteIcon: {
        "marginLeft": "auto",
    },
});


class SongList extends Component {
    constructor(props){
        super(props)
        this.state = {
            songList: [],
            playNowIndex: 0,        // play now index
            isStopState: false,
            nowProgress: 0,         // player position
            
            isReplayDisable: true,
            isPauseDisable: false,
            isStopDisable: false,
            
            playerIP: process.env.API_BASE_URL,
        }
        // youtube
        this.deleteSong = this.deleteSong.bind(this)
        this.handlePlayer = this.handlePlayer.bind(this)
    }
    componentDidMount() { // per two second update
        this.timerID = setInterval(
            () => this.pingIP(),
            2000
            );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    pingIP() {
        axios
            .get(this.state.playerIP + '/checkYoutubeDLList')
            .then(response => {
                let data = response.data
                console.log(data)
                if (data === "no songList"){
                    console.log("no songList!!!!!!")
                    this.setState({
                        songList: []
                    })
                }
                else {
                    this.setState({
                        songList: data
                    })
                }
            })
            .catch(error => {
                this.setState({
                    songList: []
                })
                console.log(error)
            })
            axios
            .get(this.state.playerIP + '/checkSongIndex')
            .then(response => {
                let data = response.data
                this.setState({
                    playNowIndex: data[0].playNowIndex,
                    isStopState: data[0].isStopState,
                    nowProgress: data[0].nowProgress,
                })
            })
            .catch(error => {
                this.setState({
                    songList: []
                })
                console.log(error)
            })
        }
    deleteSong(index){
        axios
            .get(this.state.playerIP + '/deleteYoutubeDLList/' + String(index))
        }
    handlePlayer(songIndex){
        axios
            .get(this.state.playerIP + '/nextSongIndex/' + String(songIndex))
        axios
        .get(this.state.playerIP + '/playsongList/' + String(songIndex))
        this.setState({
            isReplayDisable: true,
            isPauseDisable: false,
        })
    }
    render() {
      const { classes } = this.props;
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
      const fixedHeightPaperPlaying = clsx(classes.paperIsPlaying, classes.fixedHeight);
      const fixedHeightPaperPauseing = clsx(classes.paperIsPauseing, classes.fixedHeight);
      const fixedHeightPaperStoping = clsx(classes.paperIsStoping, classes.fixedHeight);
      
      return (
        <div>
            {this.state.songList.map(list => (
                <div key={list.index}>
                    {(() => {
                        if (list.index === this.state.playNowIndex) {
                            if (this.state.isStopState === 2){
                                return (
                                    <Paper className={fixedHeightPaperStoping}>
                                        <div className={classes.rowColumn}>
                                            <h2 key={list.index} className={classes.textMargin}>{list.index} : {list.songName}</h2>
                                            <IconButton aria-label="close" onClick={this.handlePlayer.bind(this, list.index)}>
                                                <PlayArrowIcon/>
                                            </IconButton>
                                            <IconButton aria-label="close" className={classes.textRight} onClick={this.deleteSong.bind(this, list.index)}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>
                                        <StopBar
                                            variant="determinate"
                                            color="secondary"
                                            value={this.state.nowProgress}
                                        />   
                                    </Paper>
                                )
                            }
                            else if (this.state.isStopState === 1){            
                                return (
                                    <Paper className={fixedHeightPaperPauseing}>
                                        <div className={classes.rowColumn}>
                                            <h2 key={list.index} className={classes.textMargin}>{list.index} : {list.songName}</h2>
                                            <IconButton aria-label="close" onClick={this.handlePlayer.bind(this, list.index)}>
                                                <PlayArrowIcon/>
                                            </IconButton>
                                            <IconButton aria-label="close" className={classes.textRight} onClick={this.deleteSong.bind(this, list.index)}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>
                                        <PauseBar
                                            variant="determinate"
                                            color="secondary"
                                            value={this.state.nowProgress}
                                        />                                        
                                    </Paper>
                                )
                            }
                            else if (this.state.isStopState === 0){
                                return (
                                    <Paper className={fixedHeightPaperPlaying}>
                                        <div className={classes.rowColumn}>
                                            <h2 key={list.index} className={classes.textMargin}>{list.index} : {list.songName}</h2>
                                            <IconButton aria-label="close" onClick={this.handlePlayer.bind(this, list.index)}>
                                                <PlayArrowIcon/>
                                            </IconButton>
                                            <IconButton aria-label="close" className={classes.textRight} onClick={this.deleteSong.bind(this, list.index)}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>
                                        <PlayBar
                                            variant="determinate"
                                            color="secondary"
                                            value={this.state.nowProgress}
                                        />
                                    </Paper>
                                )
                            }
                        } else {
                            return (
                                <Paper className={fixedHeightPaper}>
                                    <div className={classes.rowColumn}>
                                        <h2 key={list.index} className={classes.textMargin}>{list.index} : {list.songName}</h2>
                                        <IconButton aria-label="close" onClick={this.handlePlayer.bind(this, list.index)}>
                                            <PlayArrowIcon/>
                                        </IconButton>
                                        <IconButton aria-label="close" className={classes.textRight} onClick={this.deleteSong.bind(this, list.index)}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </Paper>
                            )
                        }
                    })()}
                    <br/>
                </div>
            ))}
        </div>
      );
    }
}

SongList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SongList);