import React, { useState, useEffect } from 'react'
import { assets } from '../../assets_admin/assets';
import axios from 'axios'
import { backendUrl } from '../../App'

const AddItems = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/category/list`);
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategories", JSON.stringify(subCategories));
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setPrice('');
        setCategory('');
        setSubCategories([]);
        setBestseller(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Upload hình ảnh */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className='w-20' src={!img ? assets.upload_img : URL.createObjectURL(img)} alt='' />
              <input type='file' id={`image${index + 1}`} hidden onChange={(e) => {
                const setter = [setImage1, setImage2, setImage3, setImage4][index];
                setter(e.target.files[0]);
              }} />
            </label>
          ))}
        </div>
      </div>

      {/* Tên sản phẩm */}
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Type here' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      {/* Mô tả sản phẩm */}
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Write content here' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      {/* Danh mục, SubCategory và giá */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategories([]); // reset sub khi đổi category
            }}
            value={category}
            className='w-full px-3 py-2'
            required
          >
            <option value="">-- Category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub categories</p>
          <div className='flex flex-wrap gap-2 max-w-[300px]'>
            {categories.find((cat) => cat.name === category)?.subCategories.map((sub, index) => (
              <div key={index} onClick={() =>
                setSubCategories(prev =>
                  prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
                )
              }>
                <p className={`${subCategories.includes(sub) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='25' required />
        </div>
      </div>

      {/* Size */}
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {["M", "L"].map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
};

export default AddItems;
