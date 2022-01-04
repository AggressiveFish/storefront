import github from "./github";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [userCount, setUserCount] = useState(0);
  const [userName, setUserName] = useState("");

  const doIt = useCallback(() => {
       const githubCall = {
            query: `{
                viewer {
                    name
                    bio
                }
            }`
       };
       fetch(github.baseURL,
              {
                method: "POST",
                body: JSON.stringify(githubCall), 
                headers: github.headers
              }
            )
            .then(response => response.json() )
            .then(data => {
                setUserCount(userCount+1);
                setUserName(data.data.viewer.name);      
                console.log(`--- Data is ${data.data.viewer.name} ${userCount}`);
              }
            )
            .catch(err => { console.log(err); } );
  }, []);
  useEffect(() => { 
                    doIt();   
                  }, []);
  return (
    <div className="App">
      <header className="App-header">
          <div className="text-primary">Hello {userName}</div>
      </header>
    </div>
  );
}

export default App;