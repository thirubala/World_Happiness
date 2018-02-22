/* global Plotly:true */
import React, { Component } from 'react';
import './App.css';
import createPlotlyComponent from 'react-plotly.js/factory'


const Plot = createPlotlyComponent(Plotly);


class App extends Component { 
   constructor(props){
        super(props);
        this.state = {
          selectedOption: 'H_Rank'
        };
       this.handleOptionChange = this.handleOptionChange.bind(this);
       this.handleFormSubmit = this.handleFormSubmit.bind(this);       
   }
  
   handleOptionChange(changeEvent) {      
      this.setState({        
        selectedOption: changeEvent.target.value
      });
    }

    //This method is used to get the data and use plotly library method to plot the data
    handleFormSubmit(formSubmitEvent) {     
        formSubmitEvent.preventDefault();
        var metricSelected = this.state.selectedOption;
        //create the body parameter to send for the fetch request
        var bodyParam = '{"metric" : "' + metricSelected +  '"}';    
       
        //get the data from the server based on the metric selected
        //make sure to use cors to get data from a different url 
         fetch('https://app.declassification29.hasura-app.io/getmetric', {  
          mode: 'cors',      
          method: 'POST',
          headers: {
                      "Content-type": "application/json;"
                    },
          body: JSON.stringify(bodyParam)
          }).then(function(response){
                return response.json();
              }).then(function(data) {
               //convert the data string object to an array                   
               var plotData = Object.values(data);
               //use map function to get the countries, this will be the x coordinate data
               var countries = plotData.map(p=>p.Country);
         
               var metric;
               //use map function to get the corresponding metric value for the country
               //this will be the y coordinate data
               switch(metricSelected)
               {
                  case "H_Rank":
                      metric = plotData.map(p=>p.H_Rank);                     
                      break;
                  case "H_Score":
                       metric = plotData.map(p=>p.H_Score);
                       break;
                  case "GDP":
                       metric = plotData.map(p=>p.GDP);
                       break;
                  case "Family":
                         metric = plotData.map(p=>p.Family);
                         break;
                  case "HLE":
                         metric = plotData.map(p=>p.HLE);
                         break;
                  case "Freedom":
                           metric = plotData.map(p=>p.Freedom);
                           break;
                  case "Generosity":
                         metric = plotData.map(p=>p.Generosity);
                         break;
                  case "TGC":
                         metric = plotData.map(p=>p.TGC);
                         break;      
               }    
         console.log("metric", metric);
         //set the variables for create the graph
          var layout = {
                        title: '',
                        showlegend: false
                    };
           var trace = {
                x: countries,
                y: metric,
                type: 'bar'            
            };

            var dataForGraph = [trace];
            //use plotly library to plot the graph at myDiv which is in index.html
            Plotly.newPlot('myDiv', dataForGraph, layout, {displayModeBar: true});
      });       
  }  

  render() {

    return (
      <div className="App">
        <header className="App-header">          
          <h1 className="App-title">World Happiness Report</h1>
        </header>
        <p className="App-intro">
          Select a metric 
        </p>
        <form onSubmit={this.handleFormSubmit} >  
          <div className="App-metric-list" >      
              <div className="radio">
                <label>
                  <input type="radio" value="H_Rank" checked={this.state.selectedOption === 'H_Rank'} onChange={this.handleOptionChange}/>
                  Happiness Rank
                </label>
                <br/>
                <label>
                  <input type="radio" value="H_Score" checked={this.state.selectedOption === 'H_Score'} onChange={this.handleOptionChange} />
                  Happiness Score
                </label>
              <br/>
                <label>
                  <input type="radio" value="GDP" checked={this.state.selectedOption === 'GDP'} onChange={this.handleOptionChange.bind(this)}/>
                  Economy GDP per Capita
                </label>
              <br/>
                <label>
                  <input type="radio" value="Family" checked={this.state.selectedOption === 'Family'} onChange={this.handleOptionChange.bind(this)}/>
                  Family
                </label>
              <br/>
                <label>
                  <input type="radio" value="HLE" checked={this.state.selectedOption === 'HLE'} onChange={this.handleOptionChange.bind(this)}/>
                  Health Life Expectency
                </label>
              <br/>
                <label>
                  <input type="radio" value="Freedom" checked={this.state.selectedOption === 'Freedom'} onChange={this.handleOptionChange.bind(this)}/>
                  Freedom
                </label>
              <br/>
                <label>
                  <input type="radio" value="Generosity" checked={this.state.selectedOption === 'Generosity'} onChange={this.handleOptionChange.bind(this)}/>
                  Generosity
                </label>
              <br/>
                <label>
                  <input type="radio" value="TGC" checked={this.state.selectedOption === 'TGC'} onChange={this.handleOptionChange.bind(this)}/>
                  Trust Government Corruption
                </label>               
             
              </div>
              <br/><br/>
                <button className="button" type="submit">Plot Data</button>
            </div>
            
                 
        </form>
      </div>
    );
  }
}


export default App;
