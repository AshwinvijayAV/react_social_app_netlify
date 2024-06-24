import { Route, Routes,Link, useNavigate } from "react-router-dom";
import About from "./About";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Missing from "./Missing";
import Footer from "./Footer";
import NewPostpage from "./NewPostpage";
import PeoplePostpage from "./PeoplePostpage";
import EditPost from "./EditPost";
import  { DataProvider } from "./context/DataContext";

 
function App() {

  return (
    <div className="App">
      <DataProvider>
       <Header title="We connect"  />
       <Nav 
      
      />
      <Routes>
      <Route path="/" element={
        <Home 
        
        />}/>  
      <Route path="post" >

       <Route index element={ <NewPostpage   />}/>
     
      
      <Route path=":id" element={<PeoplePostpage 
       />} />
       </Route>
       <Route path="/edit/:id" element={<EditPost />} />

      <Route path="about" element={<About />}/>
      <Route path="*" element={<Missing />}/>
      </Routes>
      <Footer />

     </DataProvider>
      

        
    </div>
  );
}

export default App;
