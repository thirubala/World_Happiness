This is a HPDF Plotly World Happiness Report project.

Frontend Tasks- 1)Allow users to pick a metric to be plotted from a list based on the dataset assigned. 2)Use the plotly library to plot the data for the chosen metric.

Cloning the Repository (Getting the Project) 1)On GitHub, navigate to the main page of the repository.

Under the repository name, click Clone or download.

In the Clone with HTTPs section, click image to copy the clone URL for the repository.

Open Git Bash.

Change the current working directory to the location where you want the cloned directory to be made.

Type git clone, and then paste the URL you copied in Step 2.

git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

Press Enter. Your local clone will be created.
Installation-

Install node on your machine
Install plotly library for reactjs $ npm install react-plotly.js plotly.js
Start the project-

run the command npm start
Then open http://localhost:3000/ to see your app

Backend Tasks - 
1) Get the incoming metric from frontend
2) Pass the metric to the postgres database
3) Parse the data into a python tuple
4) Send the country and metric information back to the front-end

Install the libraries in the rewuirements.txt file in the api folder using command :
`pip install library-name`

To check if app is working go to the url 
`https://api.cluster-name.hasura-app.io/cluster`

This command should display the cluster name

Additional information on how to run can be found in the `README.md` file under `\microservices\api`