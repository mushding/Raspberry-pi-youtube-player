import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CONFIG } from '../../config'

import {
    FormHelperText,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    formControl: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        minWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function PlayList(props) {
    const classes = useStyles();
    const playerIP = CONFIG.API_BASE_URL
    const [songList, setSongList] = React.useState([]);
    const [songListIndex, setSongListIndex] = React.useState('');

    const handleChange = (event) => {
        setSongListIndex(event.target.value);
        handleplayList(event.target.value)
    };
    const handleplayList = async (index) => {
        try {
            await fetch("/api/changeSongListPage/" + String(index))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const getSongListPage = async () => {
            try {
                let response = await fetch("/api/getSongListPage")
                let data = await response.json()
                setSongList(data);
            } catch (error) {
                console.log(error)
            }
        }
        getSongListPage();
    }, []);
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Select playlists to listen</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={songListIndex}
                    onChange={handleChange}
                >
                    {songList.map(list => (
                        <MenuItem key={list.index} value={list.index}>{list.listPage}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{props.name}</FormHelperText>
            </FormControl>
        </div>
    );
}