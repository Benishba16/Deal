import React, {useState, useHover, useRef} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import Sort from './Assets/images/sort';
import "./styles.css"
import Profile from "./Assets/images/profile.jpeg"
import SideNavbar from "./Components/SideNavbar/SideNavbar"
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Drift from "./Assets/images/drift.png"

const item = {
  id: v4(),
  name: "Mac App for Inventory Management",
  value: "$ 3,900 • ",
  days: "Closing in 5 Days"
}

const item2 = {
  id: v4(),
  name: "Web App",
  value: "$ 1,400 • ",
  days: "Closing in 8 Days"
}

const item3 = {
  id: v4(),
  name: "HR Management",
  value: "$ 945 • ",
  days: "Closing in 10 Days"
}

function App() {
  const contacts = [1, 2]

  const [state, setState] = useState({
    "new": {
      title: "New",
      amount: "$ 18,900  • ",
      deal: "3 Deals",
      items: [item, item2, item3]
    },
    "approved": {
      title: "Approved",
      amount: "$ 18,900  • ",
      deal: "3 Deals",
      items: []
    },
    "progress": {
      title: "Progress",
      amount: "$ 18,900  • ",
      deal: "3 Deals",
      items: []
    },
    "meeting" : {
      title: "Meeting",
      amount: "$ 18,900  • ",
      deal: "3 Deals",
      items: []
    }
  })

  const onDragStart = () => {
    console.log("first")
  }

  const handleDragEnd = ({destination, source}) => {
    console.log("destination", destination)
    console.log("source", source)
    console.log("...state[source.droppableId]", state)
    // setIsDragDisabled(true)
    if (!destination) {
      
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    console.log("source.droppableId",source.droppableId)
    console.log("source.index",source.index)
    console.log("itemCopy",itemCopy)

    setState(prev => {
      prev = {...prev}
      console.log("prev",prev)
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }
  // const [hover, setHover] = useState(false)
  // const {hover, hoverProps} = useHover()

  const hoverEnabled = true;

  
  return (
    <div className="App">
     
      <BrowserRouter>
        <div className="app-wrapper--side-navbar">
          <SideNavbar/>
        </div>
      </BrowserRouter>
      <div className="app-wrapper--container">
        <div>
          <Search/>
        </div>
        <div>
          <Header/>
        </div>
      <DragDropContext  onDragEnd={handleDragEnd}>
        <section className='deals-section'>
        
        {_.map(state, (data, key) => {
          return(
            <div key={key}>
              {/* <h3>{data.title}</h3> */}
              <div className='deals-column--header'>
                        <div className='d-flex flex-column'>
                          <span className='title'>{data.title}</span>
                          <span className='d-flex deals-amount-title'>
                            <span className='deal-head-amount'>{data.amount}</span>
                            <span className='deals-count'>{data.deal}</span>
                          </span>
                        </div>
                        <div>
                          <span className='pr-1'>{Sort(15, 15)}</span>
                        </div>
                      </div>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`${snapshot.isDraggingOver ? "dragging": "deals-column"} `}
                    >
                      {/* <div className='deals-column--header'>
                        <div className='d-flex flex-column'>
                          <span className='title'>{data.title}</span>
                          <span className='d-flex deals-amount-title'>
                            <span className='deal-head-amount'>{data.amount}</span>
                            <span className='deals-count'>{data.deal}</span>
                          </span>
                        </div>
                        <div>
                          <span className='pr-1'>{Sort(15, 15)}</span>
                        </div>
                      </div> */}
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id} >
                            {(provided, snapshot) => {
                              console.log("provided",provided)
                              console.log("snapshot",snapshot)
                              return(
                                <div
                                  // className={`${snapshot.isDragging ? "dragging" : "deal-card"}`}
                                  className={`deal-card ${snapshot.isDragging ? "deal-card-drag" : "deal-card"}`} 
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onDragStart={onDragStart}
                                  // onMouseOver={() => setHover(true)}
                                  // onMouseOut={() => setHover(false)}
                                  // hover={hoverEnabled }
                                  // {...hoverProps}
                                  
                                >
                                  <div className='deal-card--content'>
                                    <span className='deal-card--content-title'>{el.name}</span>
                                    <span className='deal-card--content-price'>
                                      <span>{el.value}</span>
                                      <span className='deals-card-days'>{el.days}</span>
                                    </span>

                                    <div className='contact-checkbox'>
                                      <div className='contact-div'>
                                        {contacts.map((contact) => (
                                          <div className='contacts'>
                                            {/* <img className='contact-pic' src={Profile} alt="profile"/> */}
                                          </div>
                                        ))}
                                        
                                    </div>
                                  
                                  <div className='checkbox-input' >
                                    <input type='checkbox' name="checkBox" className='largerCheckbox'/>
                                  </div>
                                  </div>
                                  </div>
                                  
                                  {/* <div className='contact-checkbox'>
                                  <div className='contacts'>
                                    {contacts.map((contact) => (
                                      <div className='contact-border'>
                                        <img className='contact-pic' src={Profile} alt="profile"/>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className='checkbox-input' >
                                    <input type='checkbox' name="checkBox" className='largerCheckbox'/>
                                  </div>
                                  </div> */}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
        </section>
      </DragDropContext>
      </div>
    </div>
  );
}

export default App;
