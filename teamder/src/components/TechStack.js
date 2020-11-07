import React from 'react';
import {Paper, Grid} from '@material-ui/core';
import './Profile.css';

const TechStack = (props) => {
    function getTag(tag, index)
    {
        return <Grid key={index} item xs={6} sm={4} md={3}>
            <Paper className="tag"> {tag} </Paper>
            </Grid>;
    }
    props.tags.forEach((tag) => {
        console.log(tag);
    });
    console.log(props.tags);
    return <div className="tech-stack">
        <Grid container>
            <Grid item sm={12} md={2}>
                <h2 style={{margin:"0"}}>Tech Stack</h2>
            </Grid>
            <Grid item sm={12} md={10}>
                <Grid container spacing={3}>
                    {props.tags.map((tag, index)=>getTag(tag, index))}
                </Grid>
            </Grid>
        </Grid>
        
    </div>
}

export default TechStack;