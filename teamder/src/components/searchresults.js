import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
var axios = require('axios');

var Test = require('./Test');
const Vector = require('vector-object');
var natural = require('natural');
var TfIdf = natural.TfIdf;
const querystring = require('querystring');
axios.defaults.withCredentials = true;



axios.defaults.withCredentials = true;

// const projectcard = Test();
// console.log(projectcard);

// Test().then(data => console.log(data))

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}); 

async function getData(userData){
  await axios.post("http://localhost:5000/getalldata", {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        credentials: 'include',
        withCredentials: false
      })
.then(res => res.data)
.then(projectcard => {
  // console.log(projectcard);
    const formattedData = formatData(projectcard);
    const vectors = createVectors(formattedData);
    const results = findSimilar(vectors);
    
    // console.log(getResults("5fa6ef67adbfacb6a821f4d0", results))
    const list = getResults(results.id, results)
    return list
})
}
 

export default function SearchResults(props){
  // console.log("userdata"+ props.userData)
  const listOfUsers = getData(props.userData);  
  // console.log("list: "+listOfUsers)
  // const classes = useStyles();
    return(
    listOfUsers.forEach(user => {
      <Card >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
          hello?
            {/* {user.username} */}
          </Typography>
          <Typography color="textSecondary">
            bio here
          </Typography>
          <Typography variant="body2" component="p">
            {user.techStack}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    })
  );
}




const formatData = (data) => {
    let formatted = [];
    data.map(project => {
        let tmpObj = {};

        //formatting the strings to get a uniform structure throughout the db.
        const technologiesCleaned = project.techStack.map(tool => {
            tool = tool.trim();
            tool = tool.replace(/ /g, '-');
            tool = tool.replace(/_/g, '-');
            tool = tool.replace(/\./g, '-');
            tool = tool.toLowerCase()
            
            return tool;
        })
        
        const tech = technologiesCleaned.join(' ');

        tmpObj = {
            id: project._id,
            content: tech
        }
        formatted.push(tmpObj);
    })
    
    console.log(formatted)
    return formatted;
  };

  const createVectors = processedDocs => {
    const tfidf = new TfIdf();
  
    processedDocs.forEach(processedDocument => {
      tfidf.addDocument(processedDocument.content);
    });
    const documentVectors = [];
  
    for (let i = 0; i < processedDocs.length; i += 1) {
      const processedDocument = processedDocs[i];
      const obj = {};
  
      const items = tfidf.listTerms(i);
        // console.log(items)
      for (let j = 0; j < items.length; j += 1) {
        const item = items[j];
        obj[item.term] = item.tfidf;
      }
  
      const documentVector = {
        id: processedDocument.id,
        vector: new Vector(obj)
      };
  
      documentVectors.push(documentVector);
      
    }
        return documentVectors;
    }

    const findSimilar = vectors => {
        //number of results that you want to return
        const MAX_SIMILAR = 20; 
        //min cosine similarity score that should be returned
        const MIN_SCORE = -100;
        const data = {};
      
        vectors.forEach(vector => {
            const { id } = vector;
            data[id] = [];
        })
      
        //find similar vectors
        for (let i = 0; i < vectors.length; i += 1) {
          for (let j = 0; j < i; j += 1) {
            const idi = vectors[i].id;
            const vi = vectors[i].vector;
            const idj = vectors[j].id;
            const vj = vectors[j].vector;
            const similarity = vi.getCosineSimilarity(vj);
      
            if (similarity > MIN_SCORE) {
              data[idi].push({ id: idj, score: similarity });
              data[idj].push({ id: idi, score: similarity });
            }
          }
        }
      
        // sort similar vectors in descending order
        Object.keys(data).forEach(id => {
          data[id].sort((a, b) => b.score - a.score);
      
          if (data[id].length > MAX_SIMILAR) {
            data[id] = data[id].slice(0, MAX_SIMILAR);
          }
        });
      
        return data;
    }

    

    // console.log(results)
  
    const getResults = (id, results) => {
        let similarDocuments = results[id];
      
        if (similarDocuments === undefined) {
          return [];
        }
        return similarDocuments;
      };

//     // 

// export default searchResults;