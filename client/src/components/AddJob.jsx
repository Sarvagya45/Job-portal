import React, { useRef, useState, useEffect, useContext } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const AddJob = () => {

  const { backendUrl } = useContext(AppContext)
  
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('bangalore')
  const [category, setCategory] = useState('programming')
  const [level, setLevel] = useState('Beginner level')
  const [salary, setSalary] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      // Get description from Quill editor
      const description = quillRef.current ? quillRef.current.root.innerHTML : ''
      
      // Validation
      if (!title.trim()) {
        alert('Please enter job title')
        return
      }
      
      if (!description.trim() || description === '<p><br></p>') {
        alert('Please enter job description')
        return
      }
      
      if (!salary || salary <= 0) {
        alert('Please enter a valid salary')
        return
      }

      const jobData = {
        title: title.trim(),
        description,
        location,
        category,
        level,
        salary: Number(salary)
      }

      const response = await axios.post(`${backendUrl}/api/jobs/create`, jobData)
      
      if (response.data.success) {
        alert('Job created successfully!')
        
        // Reset form
        setTitle('')
        setLocation('bangalore')
        setCategory('programming')
        setLevel('Beginner level')
        setSalary(0)
        
        // Clear Quill editor
        if (quillRef.current) {
          quillRef.current.setContents([])
        }
      } else {
        alert(response.data.message || 'Failed to create job')
      }
      
    } catch (error) {
      console.error('Error creating job:', error)
      alert('Error creating job. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='container flex p-4 flex-col w-full items-start gap-3'>

      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input 
          type="text" 
          placeholder='Type here'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' 
        />
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Categories</p>
          <select 
            className='w-full px-3 py-2 border border-gray-300 rounded' 
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select 
            className='w-full px-3 py-2 border border-gray-300 rounded' 
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Level</p>
          <select 
            className='w-full px-3 py-2 border border-gray-300 rounded' 
            value={level}
            onChange={e => setLevel(e.target.value)}
          >
            <option value='Beginner level'>Beginner level</option>
            <option value='Intermediate level'>Intermediate level</option>
            <option value='Senior level'>Senior level</option>
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Job Salary</p>
        <input 
          min={0} 
          className='w-full px-3 py-2 border-2 border-gray-300 rounded' 
          type="number" 
          placeholder='2500' 
          value={salary}
          onChange={e => setSalary(e.target.value)} 
        />
      </div> 

      <button 
        type="submit"
        disabled={isLoading}
        className={`w-28 py-3 mt-4 text-white rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
      >
        {isLoading ? 'Adding...' : 'ADD'}
      </button>
    
    </form>
  )
}

export default AddJob