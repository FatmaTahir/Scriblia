import React, { useState } from "react";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    review: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Later you'll send this to your backend API

    alert("Thank you for your review!");

    setFormData({
      name: "",
      rating: 5,
      review: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 border rounded-lg p-6 shadow-md w-full max-w-xl"
    >
      <h2
        className="text-xl font-semibold mb-4"
        style={{ fontFamily: "Playfair Display" }}
      >
        Write Your Review
      </h2>

      <div className="mb-4">
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label>Name</label>

        <input
          type="email"
          name="Email"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-2 rounded mt-1"
          required
        />
      </div>

      <div className="mb-4">
        <label>Rating</label>

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="border w-full p-2 rounded mt-1"
        >
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Review</label>

        <textarea
          name="review"
          rows="5"
          value={formData.review}
          onChange={handleChange}
          className="border w-full p-2 rounded mt-1"
          required
        />
      </div>

      <button
        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;