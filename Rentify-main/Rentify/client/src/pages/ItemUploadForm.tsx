import React, { useState } from "react";

interface ItemFormData {
  title: string;
  description: string;
  category: string;
  subtype: string;
  bidding: boolean;
  image: File | null;
}

const ItemUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<ItemFormData>({
    title: "",
    description: "",
    category: "",
    subtype: "",
    bidding: false,
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: (e.target as HTMLInputElement).files![0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Here you might want to send formData to your backend server
  };

  return (
    <div className="form-center"> {/* This class applies the centering and styling from your CSS */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleInputChange} required>
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="vehicles">Vehicles</option>
          </select>
        </div>
        <div className="form-group">
          <label>Subtype:</label>
          <input type="text" name="subtype" value={formData.subtype} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Bidding:</label>
          <input type="checkbox" name="bidding" checked={formData.bidding} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" name="image" onChange={handleInputChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ItemUploadForm;
