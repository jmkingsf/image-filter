import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
//modified version
(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async function(req: Request, res: Response) {
    const imageUrl = req.query.image_url;
    if (imageUrl)
    {
      filterImageFromURL(imageUrl).then((file:string) => {
        res.sendFile(file, (err) => {
          if(err)
          {
            console.log(err)
          }
          else 
          {
            deleteLocalFiles([file])
          }
        });
      })
    }else {
      res.send(400);
    }
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();