import React from 'react';
import ProjectCards from '../../components/ProjectCards/ProjectCards';
import NameAndAvatar from '../../components/NameAndAvatar';
import TechStack from '../../components/TechStack';
import Menu from '../../components/Menu';
import {Grid, Container, Typography} from '@material-ui/core';

// import {GitHubIcon, FacebookIcon, TwitterIcon, LinkedInIcon} from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import '../../components/Profile.css'

//temporary json file(s)      (should be removed later)
import projectcard from '../../exampleJSONs/projectcard.json'

export default function ProfilePage(){
    return(
        <div className="fullpage" style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
            <div className="topsection" style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                <div className="name-avatar-container"><NameAndAvatar style={{minWidth:"300px"}} className="NaA"  src="" name="Random User"/></div>
                    <div className="bio-container">
                        <Typography className="bio">Hey ! I am an entrepreneur and a Full Stack Web Developer. and blah blah blah looking forward to blah blah</Typography>
                        <div className="social-icons"><FacebookIcon /><GitHubIcon /><TwitterIcon /><LinkedInIcon /></div>
                    </div>
            </div>
            <div className="bottomsection" style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between"}}>    
                <div className="menu-container"><Menu className="menu"/></div>
                <div className="content-container">
                    <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", minWidth:"60vw"}}>
                        <TechStack className="stack" tags={["React","Mongodb","Express","Node", "html", "css"]}/>
                        <ProjectCards className="projects" deets={projectcard}/>
                    </div>
                </div>
                
            </div>
        </div>

//         <>
//             <Container style={{maxWidth:"100%", margin:"2% 5%"}}>
//             <Grid 
//                 container
//                 direction="row"
//                 spacing={0}
//             >
//                 <Grid item sm={12} md={12} lg={4} xs>
//                     <NameAndAvatar  src="" name="Random User"/>
//                     <Menu />
//                 </Grid>
                
//                 <Grid 
//                 container
//                 xs
//                 spacing={3}
//                 direction="row"
//   justify="flex-start"
//   alignItems="stretch"
// >


                    /* <Grid item sm={12} md={12} lg={4}>
                        <NameAndAvatar  src="" name="Random User"/>
                        <Menu />
                    </Grid> */
  
                    /* <Grid item sm={12} md={12} lg={8}>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    </Grid> */

        //             <Grid item sm={12} md={12} lg={8}>
        //             <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                   
        //                 <TechStack tags={["React","Mongodb","Express","Node"]}/>
        //                 <ProjectCards deets={projectcard}/>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </Container>
        // </>
    );
}