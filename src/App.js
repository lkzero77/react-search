import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from './components/rating/rating'
import Dropdown from './components/dropdown/dropdown'
import './App.css'
import { sortByProp } from './helper'

const sortOptions = [
  {
    label: 'Khoảng cách',
    value: 'distance',
  },
  {
    label: 'Rating',
    value: 'rating',
  }
]

const languageOptions = [
  {
    label: 'Tiếng Việt',
    value: 'vi',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Francaise',
    value: 'fr',
  }
]

function App() {
  const [data, setData] = useState([])
  const [dataOrigin, setDataOrigin] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedSort, setSelectedSort] = useState({
    label: 'Khoảng cách',
    value: 'distance'
  })

  const [selectedLanguage, setSelectedLanguage] = useState({
    label: 'Ngôn ngữ',
    value: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios(
          './data/data.json',
        )
        const _data = sortByProp(result.data, 'distance', true)
        setData(_data)
        setDataOrigin(_data)
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchData()
  }, [])

  function handleSelectedSortClick(option) {
    setSelectedSort(option)
    setData(sortByProp(data, option.value, option.value === 'distance' ? true : false))
  }

  function handleSelectedLanguageClick(option) {
    setSelectedLanguage(option)
    let _data = dataOrigin
    _data = _data.filter(item => item.language.indexOf(option.value) !== -1)
    setData(_data)
  }

  return (
    <div className="App">
      <div className="container">
        <h3>Danh sách các bác sĩ</h3>
        <div className="doctor-toolbar">
          Sắp xếp theo
          <Dropdown options={sortOptions} onClick={handleSelectedSortClick} selected={selectedSort} />

          Lọc kết quả
          <Dropdown options={languageOptions} onClick={handleSelectedLanguageClick} selected={selectedLanguage} />
        </div>

        {isError && <div>Json not found.</div>}


        {
          isLoading ? (
            <div>Loading ...</div>
          ) :
          data.map(item => (
            <div className="media border p-3 rounded-10 my-3" key={item.id}>
              <img src={item.avatar} alt={item.display_name} className="align-self-center mr-3 ml-2 rounded-10" style={{ width: 150 }}
                onError={e => console.log(e)} />
              <div className="media-body">
                <h3 className="font-weight-bold">{item.display_name}</h3>
                <Rating currentRating={item.rating} />
                <small>{item.display_name}</small>
                <p>{item.clinic_name}</p>
                <p>{item.clinic_address}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App