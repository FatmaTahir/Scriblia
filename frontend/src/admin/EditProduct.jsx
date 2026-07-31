import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EditProduct =()=>{



const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState({
  id: "",
  name: "",
  category: "",
  price: "",
  quantity: "",
  image: "",
});
useEffect(() => {
  fetch(`http://localhost:5012/api/product/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched product:", data);
      setProduct(data);
    })
    .catch((err) => console.log(err));
}, [id]);
const handleChange = (e) => {
  setProduct({
    ...product,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch(
    `http://localhost:5012/api/product/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      }),
    }
  );


  if(response.ok){
    alert("Product Updated Successfully");
    navigate("/admin/products");
  }
  else{
    alert("Update Failed");
  }

};
return(

<form
onSubmit={handleSubmit}
className="bg-white mt-8 p-8 rounded-xl shadow max-w-xl"
>

<h1 className="text-3xl font-semibold">
Edit Product
</h1>


<p className="mt-5 text-gray-600">
Editing Product ID: {id}
</p>



<div className="bg-white mt-8 p-8 rounded-xl shadow max-w-xl">


<input
className="w-full border p-3 rounded mb-4"
placeholder="Product Name"
name="name"
  value={product.name}
  onChange={handleChange}
/>


<input
className="w-full border p-3 rounded mb-4"
placeholder="Price"
name="price"
  value={product.price}
  onChange={handleChange}
/>


<input
className="w-full border p-3 rounded mb-4"
placeholder="Quantity"
name="quantity"
  value={product.quantity}
  onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Image"
name="image"
  value={product.image}
  onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Tag"
name="tag"
  value={product.tag}
  onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Category"
name="category"
value={product.category}
onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Product Description-1"
name="d1"
  value={product.d1}
  onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Product Description-2"
name="d2"
  value={product.d2}
  onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Product Description-3"
name="d3"
  value={product.d3}
  onChange={handleChange}
/>
<input
className="w-full border p-3 rounded mb-4"
placeholder="Product Description-4"
name="d4"
  value={product.d4}
  onChange={handleChange}
/>


<button
className="bg-pink-500 text-white px-6 py-3 rounded"
>
Update Product
</button>


</div>

</form>
);


}


export default EditProduct;