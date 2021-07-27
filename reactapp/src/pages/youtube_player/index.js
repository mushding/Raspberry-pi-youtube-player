import React, { Component } from 'react';
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

import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { CONFIG } from '../../config';

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
            songOrder: false,       // false downward, true upward
            isShuffle: false,

            isReplayDisable: true,
            isPauseDisable: false,
            isStopDisable: false,

            playerIP: CONFIG.API_BASE_URL,

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
    componentDidMount() { 

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
    downloadYoutubeDL = async (ytWebsite) => {
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
        try {
            await fetch("api/downloadYoutubeDL/" + videoURL);
        } catch (error) {
            console.log(error);   
        }
    }
    deleteAllSongs = async () => {
        try {
            await fetch('/api/deleteAllSong')
        } catch (error) {
            console.log(error);   
        }
    }
    handlePlayer = async (isPlayer) => {
        if (isPlayer === 0) {
            try {
                await fetch('/api/replayYoutubeDLList')
            } catch (error) {
                console.log(error);   
            }
            this.setState({
                isReplayDisable: true,
                isPauseDisable: false,
            })
        }
        if (isPlayer === 2) {
            try {
                await fetch('/api/pauseYoutubeDLList')
            } catch (error) {
                console.log(error);   
            }
            this.setState({
                isReplayDisable: false,
                isPauseDisable: true,
            })
        }
        if (isPlayer === 3) {
            try {
                await fetch('/api/stopYoutubeDLList')
            } catch (error) {
                console.log(error);   
            }
            this.setState({
                isReplayDisable: true,
                isPauseDisable: true,
            })
        }
        if (isPlayer === 6) {
            try {
                await fetch('/api/changeVolume/0')
            } catch (error) {
                console.log(error);
            }
        }
        if (isPlayer === 7) {
            try {
                await fetch('/api/changeVolume/1')
            } catch (error) {
                console.log(error);
            }
        }
        if (isPlayer === 8) {
            try {
                await fetch('/api/changeVolume/2')
            } catch (error) {
                console.log(error);
            }
        }
        if (isPlayer === 9) {
            if (this.state.sync === true) {
                this.setState({
                    sync: false,
                })
                try {
                    await fetch('/api/stopContinue')
                } catch (error) {
                    console.log(error);
                }
            }
            else if (this.state.sync === false) {
                this.setState({
                    sync: true,
                })
                try {
                    await fetch('/api/startContinue')
                } catch (error) {
                    console.log(error);
                }
            }
        }
        if (isPlayer === 10) {
            if (this.state.songOrder === true) {
                this.setState({
                    songOrder: false,
                })
                try {
                    await fetch('/api/downwardSongList')
                } catch (error) {
                    console.log(error);
                }
            }
            else if (this.state.songOrder === false) {
                this.setState({
                    songOrder: true,
                })
                try {
                    await fetch('/api/upwardSongList')
                } catch (error) {
                    console.log(error);
                }
            }
        }
        if (isPlayer === 11) {
            if (this.state.isShuffle === true) {
                this.setState({
                    isShuffle: false,
                })
                try {
                    await fetch('/api/stopShuffle')
                } catch (error) {
                    console.log(error);
                }
            }
            else if (this.state.isShuffle === false) {
                this.setState({
                    isShuffle: true,
                })
                try {
                    await fetch('/api/startShuffle')
                } catch (error) {
                    console.log(error);
                }
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
    handlePlayList = async () => {                      // handle the textfield text to button
        try {
            await fetch('/api/addSongListPage/' + String(this.state.playListText))
        } catch (error) {
            console.log(error);
        }
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
                    <h2 className={classes.textMargin}>Youtube Player v2.0</h2>
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
                                <Fab aria-label="FastRewind" className={classes.otherButton} onClick={this.handlePlayer.bind(this, 10)}>
                                    {this.state.songOrder ? <PublishIcon /> : <GetAppIcon />}
                                </Fab>
                                <Fab aria-label="FastRewind" className={classes.otherButton} onClick={this.handlePlayer.bind(this, 11)}>
                                    {this.state.isShuffle ? <ShuffleIcon /> : <FormatLineSpacingIcon />}
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