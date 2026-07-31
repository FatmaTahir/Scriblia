import React, {useState} from "react";


const AddProduct = () => {


const [product,setProduct]=useState({

name:"",
category:"",
price:"",
quantity:"",
image:""

});


const handleChange=(e)=>{

setProduct({
...product,
[e.target.name]:e.target.value
});

};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5012/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      }),
    });

    if (response.ok) {
      alert("Product Added Successfully");

      setProduct({
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
      });
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};


return (

<div className="min-h-screen bg-gray-100 p-10">


<h1 className="text-3xl font-semibold mb-8">
Add New Product
</h1>


<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow max-w-xl space-y-5"
>


<input
name="name"
placeholder="Product Name"
value={product.name}
className="w-full border p-3 rounded"
onChange={handleChange}
/>



<input
name="category"
value={product.category}
placeholder="Category"
className="w-full border p-3 rounded"
onChange={handleChange}
/>



<input
name="price"
placeholder="Price"
value={product.price}
className="w-full border p-3 rounded"
onChange={handleChange}
/>



<input
name="quantity"
placeholder="Quantity"
value={product.quantity}
className="w-full border p-3 rounded"
onChange={handleChange}
/>



<input
name="image"
placeholder="Image URL"
value={product.image}
className="w-full border p-3 rounded"
onChange={handleChange}
/>



<button
className="bg-pink-500 text-white px-6 py-3 rounded-lg"
>
Add Product
</button>


</form>


</div>

);


};


export default AddProduct;