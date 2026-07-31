import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";


const SearchDrawer = ({ isOpen, onClose }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {


        if(searchQuery.trim() === "")
        {
            setProducts([]);
            return;
        }



        const timer = setTimeout(async()=>{


            try{

                setLoading(true);


                const response = await fetch(
                    `http://localhost:5012/api/product?search=${searchQuery}`
                );


                const data = await response.json();


                setProducts(data);


            }
            catch(error){

                console.log(error);

            }
            finally{

                setLoading(false);

            }


        },500);



        return ()=>clearTimeout(timer);



    },[searchQuery]);





    const handleProductClick = (id)=>{

        onClose();

        navigate(`/product/${id}`);

    };





    const handleSearchSubmit = (e)=>{

        e.preventDefault();


        if(searchQuery.trim())
        {
            onClose();

            // navigate(
            //     `/search?q=${encodeURIComponent(searchQuery)}`
            // );

        }

    };





return (

<div
className={`fixed right-0 top-0 h-full w-full sm:w-[350px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
isOpen ? "translate-x-0" : "translate-x-full"
}`}
>
<div className="flex items-center justify-between px-6 py-4 border-b border-pink-500">
<h2 className="font-bold text-gray-800 text-lg dancing-script">
Search Our Site
</h2>
<button 
onClick={onClose}
className="text-gray-400 hover:text-pink-500"
>
<IoClose className="text-2xl"/>
</button>
</div>

<div className="px-6 pb-6 mt-3">

<form onSubmit={handleSearchSubmit}
className="relative"
>


<input

type="text"
placeholder="Search products..."

value={searchQuery}

onChange={(e)=>setSearchQuery(e.target.value)}

className="w-full px-5 py-2.5 pr-12 border border-gray-400 rounded-full focus:outline-none text-sm"

/>



<button
type="submit"
className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
>

<IoSearch className="text-xl "/>

</button>


</form>


</div>





<div className="px-6 py-3 border-t border-b bg-gray-50">


<h3 className="text-md font-bold text-gray-800 dancing-script">
Search Results
</h3>


</div>





<div className="flex-1 overflow-y-auto px-6">


{
loading &&

<p className="text-center text-gray-400 py-8"
style={{ fontFamily: "Playfair Display" }}>
Searching...
</p>

}




{
!loading &&
searchQuery &&
products.length===0 &&

<p className="text-center text-gray-400 py-8"
style={{ fontFamily: "Playfair Display" }}>
No products found
</p>

}




{
!searchQuery &&

<p className="text-center text-gray-400 py-8 text-sm"
style={{ fontFamily: "Playfair Display" }}>
Type something to discover beautiful stationery...
</p>

}




{

products.map(product=>(


<div

key={product.id}

onClick={()=>handleProductClick(product.id)}

className="flex gap-4 items-center py-4 border-b cursor-pointer group"

>


<img

src={product.image}

alt={product.name}

className="w-16 h-16 object-cover rounded-md border"

/>



<div>


<h4 className=" font-medium text-gray-800 group-hover:text-pink-500" style={{fontFamily:'PlayFair Display'}}>

{product.name}

</h4>



<p className="text-sm mt-1 text-gray-500" style={{fontFamily:'PlayFair Display'}}>
Rs {product.price}.00

</p>


</div>



</div>


))


}



</div>



</div>

);

};


export default SearchDrawer;