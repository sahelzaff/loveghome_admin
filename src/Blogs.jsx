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
      const response = await fetch('https://lovehomeconvyancingbackend-production.up.railway.app/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogEntries(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    }
  };

  const handleDelete = async (blogId) => {
    // Show confirmation dialog
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`https://lovehomeconvyancingbackend-production.up.railway.app/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      // Remove the deleted blog from the state
      setBlogEntries(blogEntries.filter(blog => blog._id !== blogId));
      
      // Show success message
      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
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
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('blogId', formData.blogId);
      formDataToSend.append('blogTitle', formData.blogTitle);
      formDataToSend.append('blogDate', formData.blogDate);
      formDataToSend.append('blogContent', formData.blogContent);
      
      // Only append file if it exists
      if (formData.blogCoverPhoto) {
        console.log('Appending file:', formData.blogCoverPhoto.name);
        formDataToSend.append('blogCoverPhoto', formData.blogCoverPhoto);
      }

      console.log('Submitting blog with data:', {
        blogId: formData.blogId,
        blogTitle: formData.blogTitle,
        blogDate: formData.blogDate,
        hasImage: !!formData.blogCoverPhoto
      });

      const response = await fetch('https://lovehomeconvyancingbackend-production.up.railway.app/api/blogs', {
        method: 'POST',
        body: formDataToSend, // Don't set Content-Type header, let browser set it with boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create blog');
      }

      const newBlogEntry = await response.json();
      console.log('Blog created successfully:', newBlogEntry);

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
      toast.success('Blog Successfully Created');
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error(error.message || 'Failed to create blog');
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
                    {blog.blogCoverPhoto ? (
                      <img 
                        src={blog.blogCoverPhoto} 
                        alt="Blog Cover" 
                        className="h-16 w-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        onError={(e) => {
                          console.error('Image failed to load:', blog.blogCoverPhoto);
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">{blog.blogTitle}</td>
                  <td className="py-3 px-6 text-left">{blog.blogDate}</td>
                  <td className="py-3 px-6 text-left">
                    <button 
                      onClick={() => handleDelete(blog._id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors duration-200"
                    >
                      Delete
                    </button>
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
              apiKey='csppoe5r4gng080o0udrfh18048w48yhz07wp2eyf5gila7u'
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
