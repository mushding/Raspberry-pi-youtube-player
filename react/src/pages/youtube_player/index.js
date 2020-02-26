import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MySnackbarContentWrapper from '../../components/CustomizedSnackbars/index'
import Playlist from '../../components/Playlist/index'
import SongList from '../../components/SongList/index'

import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

import ReplayIcon from '@material-ui/icons/Replay';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import FastForwardIcon from '@material-ui/icons/FastForward';

import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {
    Fab,
    Snackbar,
    Paper,
    TextField,
    Popover,
} from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(4),
    },
    buttonMargin: {
        margin: theme.spacing(1),
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
    tabText: {                          // Tab text
        fontSize: "20px",
        padding: theme.spacing(2),
    },
    TimeText: {
        display: "flex",
        flexDirection: "row",
    },
    paperColumn: {
        padding: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(2),       // textfile style
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontSize: "20px",
        width: 400,
    },
    textFieldMargin: {
        marginBottom: theme.spacing(2),
    },
    textRight: {
        "marginLeft": "auto",
        "padding": theme.spacing(2.5),
    },
    deleteIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    startButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "#fff",
        backgroundColor: "#339933",
        "&:hover": {
            backgroundColor: "#267326"
        },
    },
    pauseButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "#fff",
        backgroundColor: "#ff944d",
        "&:hover": {
            backgroundColor: "#e65c00"
        },
    },
    stopButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "#fff",
        backgroundColor: "#ff3333",
        "&:hover": {
            backgroundColor: "#e60000"
        },
    },
    otherButton: {
        color: "#fff",
        backgroundColor: "#2273B3",
        "&:hover": {
            backgroundColor: "#114570"
        },
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    upButton: {
        position: "fixed",
        bottom: 40,
        right: 40,
    },
    playerMargin: {
        marginLeft: theme.spacing(5),
        display: "flex",
        flexDirection: "row",
    },
    textFieldDivMargin: {
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "row",
    },
    playListDivMargin: {
        marginLeft: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
    },
    pageColor: {
        backgroundColor: "#ccffff",
    },
    playListTextField: {
        marginLeft: theme.spacing(2),       // textfile style
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: 300,
    },
    popoverButton: {
        marginTop: theme.spacing(2), 
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
});
class ScrollButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
            <Fab
                aria-label="FastForward"
                style={{
                    position: "fixed",
                    bottom: 40,
                    right: 40,
                }}
                onClick={() => { this.scrollToTop() }}>
                <ExpandLessIcon />
            </Fab>
        )
    }
}

class YoutubePlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textfieldText: "",    // tab text
            playListText: "",       // add playlist text
            sync: true,             // is sync

            isReplayDisable: true,
            isPauseDisable: false,
            isStopDisable: false,

            playerIP: process.env.API_BASE_URL,

            error: true,
            snackbarOpen: false,
            snackbarContent: "",
            variant: "error",

            anchorElAdd: null,
        }
        // Textfield
        this.focusTextInput = this.focusTextInput.bind(this);
        // youtube
        this.handlePlayer = this.handlePlayer.bind(this)
        this.deleteAllSongs = this.deleteAllSongs.bind(this)
        this.handleAddButton = this.handleAddButton.bind(this)
        this.handleAnchorElAddClose = this.handleAnchorElAddClose.bind(this)
        this.handleplayListTextChange = this.handleplayListTextChange.bind(this)
        this.handlePlayList = this.handlePlayList.bind(this)
    }
    componentDidMount() { // per two second update

    }
    handleTextFieldChange(e) {                           // handle submit add songList
        this.setState({
            textfieldText: e.target.value
        });
    }
    focusTextInput(e) {                      // handle the textfield text to button
        this.setState({
            textfieldText: e.target.value
        })
        this.downloadYoutubeDL(this.state.textfieldText)
        this.setState({
            textfieldText: ""
        })
    }
    downloadYoutubeDL(ytWebsite) {
        let videoURL = ""
        try {
            let url = new URL(ytWebsite)
            let params = url.searchParams;
            for (let pair of params.entries()) {
                if (pair[0] === "v") {
                    videoURL = pair[1]
                }
                if (pair[0] === "list") {
                    console.log("Cannot Enter List!")
                }
            }
        }
        catch (e) {
            console.log(e)
        }
        axios
            .get(this.state.playerIP + '/downloadYoutubeDL/' + videoURL)
    }
    deleteAllSongs() {
        axios
            .get(this.state.playerIP + '/deleteAllSong')
    }
    handlePlayer(isPlayer) {
        if (isPlayer === 0) {
            axios
                .get(this.state.playerIP + '/replayYoutubeDLList')
            this.setState({
                isReplayDisable: true,
                isPauseDisable: false,
            })
        }
        if (isPlayer === 2) {
            axios
                .get(this.state.playerIP + '/pauseYoutubeDLList')
            this.setState({
                isReplayDisable: false,
                isPauseDisable: true,
            })
        }
        if (isPlayer === 3) {
            axios
                .get(this.state.playerIP + '/stopYoutubeDLList')
            this.setState({
                isReplayDisable: true,
                isPauseDisable: true,
            })
        }
        if (isPlayer === 4) {
            axios
                .get(this.state.playerIP + '/stopContinue')
        }
        if (isPlayer === 5) {
            axios
                .get(this.state.playerIP + '/stopContinue')
        }
        if (isPlayer === 6) {
            axios
                .get(this.state.playerIP + '/changeVolume/0')
        }
        if (isPlayer === 7) {
            axios
                .get(this.state.playerIP + '/changeVolume/1')
        }
        if (isPlayer === 8) {
            axios
                .get(this.state.playerIP + '/changeVolume/2')
        }
        if (isPlayer === 9) {
            if (this.state.sync === true) {
                this.setState({
                    sync: false,
                })
                axios
                    .get(this.state.playerIP + '/stopContinue')
            }
            else if (this.state.sync === false) {
                this.setState({
                    sync: true,
                })
                axios
                    .get(this.state.playerIP + '/startContinue')
            }

        }
    }
    scrollToTop() {
        console.log("scroll?")
        window.scroll(100, 100)
    }
    // Snackbar close here
    snackClose() {
        this.setState({
            snackbarOpen: false
        });
    }
    handleAddButton(event) {
        this.setState({ // every 2 sec setState
            anchorElAdd: event.currentTarget,
        })
    }
    handleAnchorElAddClose() {
        this.setState({
            anchorElAdd: null,
        });
    };
    handleplayListTextChange(e) {
        this.setState({
            playListText: e.target.value,
        });
    }
    handlePlayList() {                      // handle the textfield text to button
        axios
            .get(this.state.playerIP + '/addSongListPage/' + String(this.state.playListText))
        this.setState({
            playListText: "",
            anchorElAdd: null,
        });
    }
    render() {
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <div className={classes.pageColor}>
                <br />
                <Paper className={fixedHeightPaper}>
                    <h2 className={classes.textMargin}>Youtube Player v1.0</h2>
                    <div>
                        <div className={classes.TimeText}>
                            <div className={classes.TimeText}>
                                <Fab aria-label="start" disabled={this.state.isReplayDisable} className={classes.startButton} onClick={this.handlePlayer.bind(this, 0)}>
                                    <ReplayIcon />
                                </Fab>
                                <Fab aria-label="pause" disabled={this.state.isPauseDisable} className={classes.pauseButton} onClick={this.handlePlayer.bind(this, 2)}>
                                    <PauseIcon />
                                </Fab>
                                <Fab aria-label="refresh" disabled={this.state.isStopDisable} className={classes.stopButton} onClick={this.handlePlayer.bind(this, 3)}>
                                    <StopIcon />
                                </Fab>
                            </div>
                            <div className={classes.playerMargin}>
                                <Fab aria-label="FastRewind" className={classes.otherButton} onClick={this.handlePlayer.bind(this, 4)}>
                                    <FastRewindIcon />
                                </Fab>
                                <Fab aria-label="FastForward" className={classes.otherButton} onClick={this.handlePlayer.bind(this, 5)}>
                                    <FastForwardIcon />
                                </Fab>
                            </div>
                            <div className={classes.playerMargin}>
                                <Fab aria-label="FastRewind" className={classes.startButton} onClick={this.handlePlayer.bind(this, 6)}>
                                    <VolumeDownIcon />
                                </Fab>
                                <Fab aria-label="FastForward" className={classes.pauseButton} onClick={this.handlePlayer.bind(this, 7)}>
                                    <VolumeUpIcon />
                                </Fab>
                                <Fab aria-label="FastForward" className={classes.stopButton} onClick={this.handlePlayer.bind(this, 8)}>
                                    <VolumeOffIcon />
                                </Fab>
                            </div>
                            <div className={classes.playerMargin}>
                                <Fab aria-label="FastRewind" className={classes.otherButton} onClick={this.handlePlayer.bind(this, 9)}>
                                    {this.state.sync ? <SyncIcon /> : <SyncDisabledIcon />}
                                </Fab>
                            </div>
                        </div>
                        <div className={classes.textFieldDivMargin}>
                            <TextField
                                id="songList"
                                label="Enter youtube website"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.textfieldText}
                                onChange={(e) => this.handleTextFieldChange(e)}
                            />
                            <Fab color="primary" className={classes.deleteIcon} aria-label="send" onClick={(e) => this.focusTextInput(e)}>
                                <SendIcon />
                            </Fab>
                        </div>
                        <div className={classes.playListDivMargin}>
                            <Playlist />
                            <Fab
                                aria-describedby={"addPlayList"}
                                color="primary"
                                className={classes.deleteIcon}
                                aria-label="send"
                                onClick={this.handleAddButton}
                            >
                                <AddIcon />
                            </Fab>
                            <Fab aria-label="delete" className={classes.deleteIcon} onClick={this.deleteAllSongs}>
                                <DeleteIcon />
                            </Fab>
                            <Popover
                                id={"addPlayList"}
                                open={Boolean(this.state.anchorElAdd)}
                                anchorEl={this.state.anchorElAdd}
                                onClose={this.handleAnchorElAddClose.bind()}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <div className={classes.TimeText}>
                                    <TextField
                                        id="add"
                                        label="Type new playlist name"
                                        className={classes.playListTextField}
                                        margin="normal"
                                        value={this.state.playListText}
                                        onChange={(e) => this.handleplayListTextChange(e)}
                                    />
                                    <Fab color="primary" aria-label="sendplaylist" className={classes.popoverButton} onClick={this.handlePlayList}>
                                        <SendIcon />
                                    </Fab>
                                </div>
                            </Popover>
                        </div>
                    </div>
                </Paper>
                <br />

                <SongList />

                <ScrollButton scrollStepInPx="120" delayInMs="16.66" />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={1000}
                    onClose={this.snackClose.bind(this)}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                >
                    <MySnackbarContentWrapper
                        onClose={this.snackClose.bind(this)}
                        variant={this.state.variant}
                        message={<span id="message-id">{this.state.snackbarContent}</span>}
                    />
                </Snackbar>
            </div>
        );
    }
}

YoutubePlayer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YoutubePlayer);