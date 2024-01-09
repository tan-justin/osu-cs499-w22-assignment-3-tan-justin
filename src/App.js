/** @jsxImportSource @emotion/react */
import {useState, useEffect} from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import { Global, css, jsx} from '@emotion/react';

const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
    body{
      font-family: 'Redressed', cursive;
      margin: 0;
    }
`;

function App() {

  const headerStyle = css`
    background-image: url("https://i.pinimg.com/originals/dc/f6/c3/dcf6c3211b4726d6fe8c5500c8ea8ac0.jpg");
    color: ghostwhite;
    justify-content: center;
    padding: 20px;
    border: 10px solid lightskyblue;
    display: flex;
    margin: 0;
  `
  const headerStyleDark = css`
    background-image: url("https://filterforge.com/filters/3040.jpg");
    color: snow;;
    justify-content: center;
    padding: 20px;
    border: 10px solid #404040;
    display: flex;
    margin: 0;
  `

  const divStyle =css`
    background-image:linear-gradient(aliceblue, lightskyblue 30%, skyblue, deepskyblue);
    background-size: cover;
    height: 1100vh;
    width: 99vw;
  `
  const divStyleDark =css`
    background-image:linear-gradient(#262626, #333333 30%, #404040, #4d4d4d);
    background-size: cover;
    height: 1100vh;
    width: 99vw;
  `
  const [darkModeActive, setDarkModeActive] = useState(true);

  return(
    <div>
      <Global styles={globalStyle} />
      <div css={darkModeActive ? divStyle : divStyleDark}>
        <h1 css={darkModeActive ? headerStyle : headerStyleDark}>Lé Weather Watcher~</h1>
        <Menu darkModeActive={darkModeActive} setDarkModeActive={setDarkModeActive}/>
        <Routes>
          <Route path="/" element={<Home darkModeActive={darkModeActive}/>}/>
          <Route path="/16Day" element={<SixteenDays darkModeActive={darkModeActive}/>}/>
          <Route path ="/Credits" element={<Credits darkModeActive={darkModeActive}/>}/>
          <Route path="*" element={<Error darkModeActive={darkModeActive}/>}/>
        </Routes>
      </div>
    </div>
  );
}

function DarkModeButton(props){

   const darkButtonStyle = css`
    background-color: white;
    color: black;
    border: 2px solid steelblue;
    border-radius: 10px;

    &:hover{
      background-color: steelblue;
      color: white;
      border: 2px solid white;
      border-radius: 10px;
    }  
  `
  const darkButtonStyleDark = css`
    background-color: ghostwhite;
    color: black;
    border: 2px solid black;
    border-radius: 10px;

    &:hover{
      background-color: black;
      color: ghostwhite;
      border: 2px solid ghostwhite;
      border-radius: 10px;
    }  
  `

  return(
    <button css={props.darkModeActive ? darkButtonStyleDark : darkButtonStyle} onClick={(e)=>{props.setDarkModeActive(prevCheck=>!prevCheck)}}>
      {props.darkModeActive ? "Dark Mode" : "Light Mode"}
    </button>
  )
}

function Home(props){

  const textStyle=css`
    text-align: center;
    color: royalblue;
    padding-top: 10%;
  `
  const textStyleDark=css`
    text-align: center;
    color: Gainsboro;
    padding-top: 10%;
  `

  const instructionStyle=css`
  text-align: center;
  color: royalblue;
  padding-top: 10%;
  font-size: 20px;
  `
  const instructionStyleDark=css`
  text-align: center;
  color: Gainsboro;
  padding-top: 10%;
  font-size: 20px;
  `
  const creditStyle=css`
  text-align: center;
  color: royalblue;
  padding-top: 10%;
  font-size: 15px;
  `
  const creditStyleDark=css`
  text-align: center;
  color: Gainsboro;
  padding-top: 10%;
  font-size: 15px;
  `

  return(
    <div>
      <h2 css={props.darkModeActive ? textStyle : textStyleDark}>
        Welcome to Lé Weather Watcher. Please select from the above menu options!
      </h2>
      <p css={props.darkModeActive ? instructionStyle : instructionStyleDark}>How to use: Open the 16 Day Forecast tab, start typing away and hit the search button! Do note you have to enter all fields for data to show up!</p>
      <p css={props.darkModeActive ? creditStyle : creditStyleDark}>This project is made solely for the purpose of education. All material used in the making of this project rightfully belong to their respective owners</p>
    </div>
  );

}

function Menu(props){
  
  const menuStyle =css`
    background-color: skyblue;
    color: snow;
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    border: 10px solid powderblue;
    font-size: 20px;
    font-style: bold;
    border-radius: 15px;

    .active{
      color: darkblue;
      font-size: 28px;
    }
  `
  const menuStyleDark = css`
    background-color: black;
    color: slategrey;
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    border: 10px solid ;
    font-size: 20px;
    font-style: bold;
    border-radius: 15px;

    .active{
      color: gold;
      font-size: 28px;
    }
  `
  const linkStyle = css`
    color: dodgerblue;
    text-decoration: none;
    &:hover{
      font-size: 30px;
    }
  
  `
  const linkStyleDark = css`
  color: Gainsboro;
  text-decoration: none;
  &:hover{
    font-size: 30px;
  }
  `

  return (
    <nav css={props.darkModeActive ? menuStyle : menuStyleDark}>
      <NavLink css={props.darkModeActive ? linkStyle : linkStyleDark} to='/'>Home</NavLink>
      <NavLink css={props.darkModeActive ? linkStyle : linkStyleDark} to='/16Day'>16 Days Forecast</NavLink>
      <NavLink css={props.darkModeActive ? linkStyle : linkStyleDark} to='/Credits'>Credits</NavLink>
      <DarkModeButton darkModeActive={props.darkModeActive} setDarkModeActive={props.setDarkModeActive}/>
     </nav>
  );
}

function SixteenDays(props){
  
  const [weather, setWeather] = useState([]);
  const [cnt, setCount] = useState('');
  const [cityName, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [cntHolder, setCountHolder] = useState('');
  const [cityNameHolder, setCityNameHolder] = useState('');
  const [stateHolder, setStateHolder] = useState('');
  const [countryHolder, setCountryHolder] = useState('')

  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(false);

  const getDataRequest = async(cityName, stateCode, countryCode, cnt)=>{
    if(!(cityName && stateCode && countryCode && cnt)){
      setWeather([]);
      return;
    }
    setError(false);
    setLoading(true);

    try{
      const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},${stateCode},${countryCode}&cnt=${cnt}&units=metric&appid=da655239f538023532cc87591851330d`
      const response = await fetch(url)
      const responseJSON = await response.json()
      if(responseJSON["cod"]==="404" || responseJSON["cod"]==="401"){
        setWeather([]);
        setLoading(false);
        setError(true);
        return;
      }
      if(responseJSON.list){ 
        setWeather(responseJSON.list);
        setError(false);
      }
    }
      catch(e){
        if(e instanceof DOMException){
          console.log("==HTTP request cancelled")
        }
        else{
          throw e;
        }

      }
  }
  useEffect(()=>{
    getDataRequest(cityName,stateCode,countryCode, cnt);
  }, [cityName, stateCode, countryCode, cnt])

  return(
   <div>
      <Search cityName={cityName} setCity={setCity} stateCode={stateCode} setStateCode={setStateCode} countryCode={countryCode} 
        setCountryCode={setCountryCode} cnt={cnt} setCount={setCount} getDataRequest={getDataRequest} cntHolder={cntHolder} 
        setCountHolder={setCountHolder} cityNameHolder={cityNameHolder} setCityNameHolder={setCityNameHolder} stateHolder={stateHolder} 
        setStateHolder={setStateHolder} countryHolder={countryHolder} setCountryHolder={setCountryHolder} darkModeActive={props.darkModeActive}
        />
      <div>
          {error ? <ErrorEntry darkModeActive={props.darkModeActive}/> : null }
      </div>
      <div>
        {<Display data = {weather} darkModeActive={props.darkModeActive}/> }
      </div>
    </div>
    

  )
  
}
const Search=(props)=>{

  const formStyle = css`
    background-color: azure;
    display: flex;
    justify-content: space-evenly; 
    border: 5px solid lightskyblue;
    border-bottom-style: 5px groove lightskyblue;
    border-radius: 15px;
  `
  const formStyleDark = css`
    background-color: #666666;
    display: flex;
    justify-content: space-evenly; 
    border: 5px solid lightslategrey;
    border-bottom-style: 5px groove lightslategrey;
    border-radius: 15px;
  `

  const buttonStyle = css`
    background-color: white;
    color: black;
    border: 2px solid steelblue;
    border-radius: 8px;

    &:hover{
      background-color: steelblue;
      color: white;
      border: 2px solid white;
      border-radius: 8px;
    }  
  `
  const buttonStyleDark = css`
    background-color: black;
    color: white;
    border: 2px solid ghostwhite;
    border-radius: 8px;

    &:hover{
      background-color: ghostwhite;
      color: black;
      border: 2px solid black;
      border-radius: 8px;
    }  
  `

  return(
    <form 
        onSubmit={(e)=>{e.preventDefault();
        props.setCity(props.cityNameHolder);
        props.setStateCode(props.stateHolder);
        props.setCountryCode(props.countryHolder);
        props.setCount(props.cntHolder);
        props.getDataRequest(props.cityName, props.stateCode, props.countryCode, props.cnt)
      }}>
      <fieldset css={props.darkModeActive ? formStyle : formStyleDark}>
        <input size="30" value = {props.cityNameHolder} onChange={(e)=>props.setCityNameHolder(e.target.value)} placeholder='Enter City Name Here'></input>
        <input size="30" value = {props.stateHolder} onChange={(e)=>props.setStateHolder(e.target.value)} placeholder='Enter State Code Here'></input>
        <input size="30" value = {props.countryHolder} onChange={(e)=>props.setCountryHolder(e.target.value)} placeholder='Enter Country Code Here'></input>
        <input size="30" value = {props.cntHolder} onChange={(e)=>props.setCountHolder(e.target.value)} placeholder='Enter No. of Days (1-16)'></input>
        <button css={props.darkModeActive ? buttonStyle : buttonStyleDark} type = "Submit">Search</button>
      </fieldset>
      </form>
  )

}

const Display = (props) =>{

  const displayStyle = css`
    display: flex;
    padding-left: 5%;
    flex-direction: column;
    border-bottom: 3px solid cornflowerblue;
    border-left: 3px solid cornflowerblue;
    border-right: 3px solid cornflowerblue;
    font-size: 18px;
    elevation: 20 degrees;
  `
  const displayStyleDark = css`
    display: flex;
    padding-left: 5%;
    flex-direction: column;
    border-bottom: 1.5px solid snow;
    border-left: 3px solid snow;
    border-right: 3px solid snow;
    border-top: 1.5px solid snow;
    font-size: 18px;
    color: ghostwhite;
    elevation: 20 degrees;
  `

  return(
    <div>
      {props.data.map((index, variable)=>  
          <div css={props.darkModeActive ? displayStyle : displayStyleDark} key = {variable}>
            <h1>Day {variable+1}</h1>
            <p>Time: {Date(index.dt)}</p>
            <p>High: {index.temp.max} Celcius</p>
            <p>Low: {index.temp.min} Celcius</p>
            <p>Possibility of Precipitation: {index.pop * 100}%</p>
            <div>
              <Image  icon= {index.weather}/>
            </div>
            <p>Description: {
              index.weather.map((number, key)=><div key={key}>{number.description}</div>)
            }</p>
          </div>
      )}
    </div>
  )
}

const Image = (props)=>{
  return(
    <div>
      {props.icon.map((variable, index)=>
        <img key ={index} src = {`http://openweathermap.org/img/wn/${variable.icon}@2x.png`} alt ="weather"></img>
      )}
      
    </div>
  )

}

function History(){



}

function Credits(props){

  const textStyle=css`
    text-align: center;
    color: royalblue;
    padding-top: 8%;
    font-size: 20px;

    a{
      color: mediumblue;
    }
  `
  const textStyleDark=css`
    text-align: center;
    color: silver;
    padding-top: 8%;
    font-size: 20px;

    a{
      color: snow;
    }
  `

  return(
    <div css={props.darkModeActive ? textStyle : textStyleDark}>
      <p>This website uses the OpenWeather API. For more information, visit their website at: </p>
      <a href="https://openweathermap.org">https://openweathermap.org</a>
      <p>This is the link to the error page cloud gif</p>
      <a href="https://monophy.com/media/xUOwGoNa2uX6M170d2/monophy.gif">https://monophy.com/media/xUOwGoNa2uX6M170d2/monophy.gif</a>
    </div>
  )
}
  
function Error(props){

  const errorWhole = css`
    display: block;
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
    
  `
  const errorStyle = css`
    text-align: center;
    color: mediumblue;
    font-size: 30px;
    padding-top: 10%;
  `
  const errorStyleDark = css`
    text-align: center;
    color: silver;
    font-size: 30px;
    padding-top: 10%;
  `

  return(
    <div >
      <h1 css={props.darkModeActive ? errorStyle : errorStyleDark}>This data entry does not exist, please hit the back button or select from one of the menu options</h1>
      <img css={errorWhole} src="https://monophy.com/media/xUOwGoNa2uX6M170d2/monophy.gif" alt="rain"></img>
    </div>
    
  )

}

function ErrorEntry(props){

  const errorWhole = css`
    display: block;
    max-width: 25%;
    max-height: 25%;
    margin-left: auto;
    margin-right: auto;
    
  `
  const errorStyle = css`
    text-align: center;
    color: mediumblue;
    font-size: 30px;
    padding-top: 8%;
  `
  const errorStyleDark = css`
    text-align: center;
    color: silver;
    font-size: 30px;
    padding-top: 8%;
  `

  return(
    <div >
      <h1 css={props.darkModeActive ? errorStyle : errorStyleDark}>This data entry does not exist, please try again</h1>
      <img css={errorWhole} src="https://monophy.com/media/xUOwGoNa2uX6M170d2/monophy.gif" alt="rain"></img>
    </div>
    
  )

}

export default App;
