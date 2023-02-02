import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App () {
  console.log('*****enter app function component once')
  let [count, setCount] = useState(1)
  let [string, setString] = useState([])
  let [toggle, setToggle] = useState(-1) // I can toggle everything, switch up and down
  let [search, setSearch] = useState('')
  let [result, setResult] = useState([])

  function searchfunc (event) {
    setSearch(event.target.value)
  }

  function execute () {
    let output = []
    string.forEach(line => {
      const locationData = line.location
      console.log('locationData')
      const locationString = flat(locationData)
      console.log('locationString')
      let rowValues = Object.values(locationString)
      console.log('rowValues', rowValues, search)
      if (rowValues.includes(search)) {
        output.push(line)
      }
    })
    console.log('output', output)
    setResult(output)
  }

  function sortByCity () {
    console.log('enter sort by city')

    let array = [...string]
    console.log('initalarray', array)
    array.sort(function (a, b) {
      if (a.location.city < b.location.city) {
        return -1 * toggle
      } else {
        return 1 * toggle
      }
    })
    console.log('after sort', array)
    setToggle(toggle => toggle * -1)
    setString(array)
  }

  function sortByState () {
    console.log('enter sort by state')

    let array = [...string]
    console.log('initalarray', array)
    array.sort(function (a, b) {
      if (a.location.state < b.location.state) {
        return -1
      } else {
        return 1
      }
    })
    console.log('after sort', array)
    setToggle(toggle => toggle * -1)
    setString(array)
  }

  useEffect(() => {
    const getString = async () => {
      const { data } = await axios.get(`https://randomuser.me/api/?results=${count}`)
      console.log('data', data)
      setString(string => [...data.results, ...string])
    }
    // use something that not mutable
    getString()
  }, [count])

  function flat (initialObject, finalObject = {}) {
    for (let key in initialObject) {
      if (typeof initialObject[key] !== 'object') {
        finalObject[key] = initialObject[key]
      } else {
        flat(initialObject[key], finalObject)
      }
    }
    return finalObject
  }

  return (
    <div className='App'>
      <h1> Hello Code SandBox </h1>
      <h2> Start editing to see morre maginc happen ! </h2>
      <button
        className='test1'
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {' '}
        Load More Page{' '}
      </button>
      <br></br> <br></br> <br></br> <br></br>
      <table>
        <thead>
          <th> Full name </th>
          <th> gender </th>
          <th> email </th>
          <th> number </th>
          <th> name </th>
          <th onClick={sortByCity}> city </th>
          <th onClick={sortByState}> state </th>
          <th> country </th>
          <th> postcode </th>
          <th> latitude </th>
          <th> longitude </th>
          <th> offset </th>
          <th> description </th>
        </thead>
        <tbody>
          {string.map((single, index) => {
            const locationData = single.location
            const locationString = flat(locationData)

            return (
              <tr key={index}>
                <td> {single.name.first + ' ' + single.name.last} </td>
                <td> {single.gender} </td>
                <td> {single.email} </td>
                {Object.values(locationString).map(part => (
                  <td> {part} </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br></br>
      <div>
        <lable> Search Row Here by Location</lable>
        <input type='text' value={search} onChange={searchfunc} />
        <button onClick={execute}> Search </button>
      </div>
      <div className='displaySearchResult'>
        <table>
          <thead>
            <th> Full name </th>
            <th> gender </th>
            <th> email </th>
            <th> number </th>
            <th> name </th>
            <th onClick={sortByCity}> city </th>
            <th onClick={sortByState}> state </th>
            <th> country </th>
            <th> postcode </th>
            <th> latitude </th>
            <th> longitude </th>
            <th> offset </th>
            <th> description </th>
          </thead>
          <tbody>
            {result.map((single, index) => {
              const locationData = single.location
              const locationString = flat(locationData)

              return (
                <tr key={index}>
                  <td> {single.name.first + ' ' + single.name.last} </td>
                  <td> {single.gender} </td>
                  <td> {single.email} </td>
                  {Object.values(locationString).map(part => (
                    <td> {part} </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
