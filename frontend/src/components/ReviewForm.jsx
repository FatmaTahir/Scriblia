import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ closeForm = () => {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    review: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (value) => {
    setFormData({
      ...formData,
      rating: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for your review!");
    closeForm();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]"
      onClick={closeForm}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} 
        className="bg-white w-[420px] rounded-2xl p-6 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display" }}>
          Write a Review 
        </h2>
        <div className="flex items-center gap-3 mb-5">
          <span style={{ fontFamily: "Playfair Display" }}>Rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                className={`text-3xl cursor-pointer ${
                  star <= formData.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={{ fontFamily: "Playfair Display" }}
          className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Review Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Review Title"
          style={{ fontFamily: "Playfair Display" }}
          className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Review */}
        <textarea
          name="review"
          rows="4"
          value={formData.review}
          onChange={handleChange}
          placeholder="Share your thoughts..."
          style={{ fontFamily: "Playfair Display" }}
          className="w-full border rounded-lg p-1 mb-5 resize-none outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeForm}
            style={{ fontFamily: "Playfair Display" }}
            className="border border-pink-400 text-pink-500 px-6 py-1 rounded-3xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-1 rounded-3xl hover:bg-pink-600"
            style={{ fontFamily: "Playfair Display" }}
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;