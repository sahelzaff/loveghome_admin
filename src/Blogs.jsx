import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
  const [formData, setFormData] = useState({
    blogId: '',
    blogTitle: '',
    blogDate: '',
    blogContent: '',
    blogCoverPhoto: null,
    previewImage: ''
  });

  const [blogEntries, setBlogEntries] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogEntries(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'blogCoverPhoto') {
      const reader = new FileReader();
      const file = files[0];

      reader.onloadend = () => {
        setFormData({
          ...formData,
          blogCoverPhoto: file,
          previewImage: reader.result
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      blogContent: content
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('blogId', formData.blogId);
    formDataToSend.append('blogTitle', formData.blogTitle);
    formDataToSend.append('blogDate', formData.blogDate);
    formDataToSend.append('blogContent', formData.blogContent);
    formDataToSend.append('blogCoverPhoto', formData.blogCoverPhoto);
  
    try {
      const response = await fetch('http://localhost:4000/api/blogs', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new blog');
      }
  
      const newBlogEntry = await response.json();
  
      // Update blogEntries state to include the new entry
      setBlogEntries([...blogEntries, newBlogEntry]);
  
      // Clear form data after submission
      setFormData({
        blogId: '',
        blogTitle: '',
        blogDate: '',
        blogContent: '',
        blogCoverPhoto: null,
        previewImage: ''
      });
  
      // Show success toast
      toast.success('Blog Successfully Created', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.error('Error adding new blog:', error);
  
      // Show error toast
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div className="w-full h-auto max-w-screen-4xl px-10 flex flex-col items-center space-y-8 p-8">
      <ToastContainer />

      {/* Existing Blogs Table */}
      <div className="w-full max-w-4xl">
        <h1 className='font-extrabold text-[#f0532d] text-5xl'>Blogs</h1>
        <div className='w-full h-[0.15rem] bg-gray-300 mb-5'></div>
        <h2 className="text-xl font-bold mb-4">Existing Blogs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="min-w-full bg-[#f0532d] text-white uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Blog ID</th>
                <th className="py-3 px-6 text-left">Cover Photo</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {blogEntries.map((blog, index) => (
                <tr key={index} className="text-black border-b border-gray-300 cursor-pointer hover:bg-gray-200">
                  <td className="py-3 px-6 text-left">{blog.blogId}</td>
                  <td className="py-3 px-6 text-left">
                    <img src={`http://localhost:4000/${blog.blogCoverPhoto}`} alt="Blog Cover" className="h-16 w-auto object-cover" />
                  </td>
                  <td className="py-3 px-6 text-left">{blog.blogTitle}</td>
                  <td className="py-3 px-6 text-left">{blog.blogDate}</td>
                  <td className="py-3 px-6 text-left">
                    <button className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Entry Form */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden p-6" id="blogForm">
          {/* Blog ID (optional) */}
          <div className="mb-4">
            <label htmlFor="blogId" className="block text-sm font-medium text-gray-700">Blog ID:</label>
            <input
              type="text"
              id="blogId"
              name="blogId"
              value={formData.blogId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Upload Area for Blog Cover Photo */}
          <div className="mb-4">
            <label htmlFor="blogCoverPhoto" className="block text-sm font-medium text-gray-700">Upload Cover Photo:</label>
            <input
              type="file"
              id="blogCoverPhoto"
              name="blogCoverPhoto"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
            {formData.previewImage && (
              <img src={formData.previewImage} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded-lg shadow-md" />
            )}
          </div>

          {/* Blog Title */}
          <div className="mb-4">
            <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="blogTitle"
              name="blogTitle"
              value={formData.blogTitle}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Blog Date */}
          <div className="mb-4">
            <label htmlFor="blogDate" className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              id="blogDate"
              name="blogDate"
              value={formData.blogDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Rich Text Area for Blog Content */}
          <div className="mb-4">
            <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700">Content:</label>
            <Editor
              apiKey='6i4ekg4ip08hajw6dak9q9oh36eao9k836fww7kmte9glc7a'
              value={formData.blogContent}
              onEditorChange={handleEditorChange}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help'
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blogs;
