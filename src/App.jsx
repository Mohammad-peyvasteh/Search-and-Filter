import { useState } from "react";
import "./App.css";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Nav from "./navigation/Nav";
import products from './db/data'
import Card from "./components/Card";

function App() {
  const [selectCategory,setSelectCategory] = useState(null);

  //input filter

  const [query,setQuery]=useState("")

  const handleInputChange=(e)=>{
    setQuery(e.target.value)

  }

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //Radio Filter
  const handleChange=(e)=>{
    setSelectCategory(e.target.value)

  }

  //Buttons Filter

  const handleClick=(e)=>{
    setSelectCategory(e.target.value)

  }
  function filteredData(products, selected, query){
    let filteredProducts = products;

    //Filtering Input Items
    if(query){
      filteredProducts=filteredItems
    }

     // Applying selected filter
     if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }
    return filteredProducts.map(({ img, title, star, reviews, prevPrice, newPrice })=>(
      <Card key={Math.random()}
      img={img}
      title={title}
      star={star}
      reviews={reviews}
      prevPrice={prevPrice}
      newPrice={newPrice}/>
    ))

  }

 const result= filteredData(products,selectCategory,query)
  return (
    <div>
      <Sidebar handleChange={handleChange}/>
      <Nav query={query} handleInputChange={handleInputChange}/>
      <Recommended handleClick={handleClick}/>
      <Products result={result} />
    </div>
  );
}

export default App;
