import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../App';
import { Link } from 'react-router-dom';

const AllReviewItem = ({ token }) => {
  const [listItems, setListItems] = useState([]);

  // 1. Fetch reviews and sentiment
  const fetchList = async () => {
    try {
      // 1.1. Lấy review từ backend
      const response = await axios.get(backendUrl + '/api/product/list-review', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) return;

      const raw = response.data.products;
      // 1.2. Phân tích sentiment cho từng comment
      const withSentiment = await Promise.all(
        raw.map(async (item) => {
          const sentRes = await axios.post(
            backendUrl + '/api/analyze-sentiment',
            { comment: item.comment },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return {
            ...item,
            sentiment: sentRes.data.sentiment, // "positive" | "neutral" | "negative"
          };
        })
      );

      setListItems(withSentiment);
    } catch (error) {
      console.error('Error fetching reviews or analyzing sentiment:', error);
    }
  };

  // 2. Remove review
  const removeProduct = async (id) => {
    try {
      const resp = await axios.delete(backendUrl + '/api/product/remove-review', {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id: id },
      });
      if (resp.data.success) {
        await fetchList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Review List</p>
      <div className="flex flex-col gap-2">
        {/* Header chỉ hiển thị trên md trở lên */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_3fr_1fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Username</b>
          <b>Rating</b>
          <b>Comment</b>
          <b>Feedback Analysis</b>
          <b>Date</b>
          <b className="text-center">Action</b>
        </div>

        {listItems.map((item, index) => (
          <div
            key={item._id || index}
            className="flex flex-wrap md:grid md:grid-cols-[1fr_1fr_3fr_1fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <p className="min-w-[80px]">{item.username}</p>
            <p className="min-w-[70px]">{item.rating}</p>
            <p className="min-w-[70px]">{item.comment}</p>
            <p className="min-w-[70px] capitalize">
              <span
                className={
                  item.sentiment === 'positive'
                    ? 'text-green-500'
                    : item.sentiment === 'negative'
                      ? 'text-red-500'
                      : 'text-gray-500'
                }>
                {item.sentiment}
              </span>
            </p>
            <p className="min-w-[60px]">{new Date(item.date).toLocaleDateString()}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-red-500"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllReviewItem;