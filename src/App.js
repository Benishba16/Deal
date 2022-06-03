import React, {useState, useHover, useRef} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import Sort from './Assets/images/sort';
import "./styles.css"
import SideNavbar from "./Components/SideNavbar/SideNavbar"
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import {isEmpty} from "lodash"

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

  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [placeholderProps, setPlaceholderProps] = useState({});

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
    },
    "demo" : {
      title: "Demo",
      amount: "$ 18,900  • ",
      deal: "3 Deals",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    console.log("destination", destination)
    console.log("source", source)
    console.log("...state[source.droppableId]", state)
    if (!destination) {
      return
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }
    
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      console.log("prev",prev)
      prev[source.droppableId].items.splice(source.index, 1)
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
      return prev
    })
  }

  const handleDragStart = event => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      )
    });
  };

  const handleDragUpdate = event => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1)
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      )
    });
  };

  const getDraggedDom = draggableId => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-wrapper--side-navbar">
          <SideNavbar/>
        </div>
      </BrowserRouter>
        <div className="app-wrapper--container">
          <div><Search/></div>
          <div><Header/></div>
      <DragDropContext  
        onDragEnd={handleDragEnd} 
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        >
        <section className='deals-section'>
        {_.map(state, (data, key) => {
          return(
            <div key={key}>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`deals-column `}
                    >
                      <div className='zindex-hover'>
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

                      <div 
                      // className={`dealcard-placeholder `}
                      >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}  className="draggable">
                            {(provided, snapshot) => {
                              console.log("provided",provided)
                              console.log("snapshot",snapshot)
                              return(
                                <div
                                  className={`deal-card ${snapshot.isUsingPlaceholder && "drop-animate"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  
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
                                          </div>
                                        ))}
                                        
                                    </div>
                                  
                                  <div className='checkbox-input' >
                                    <input type='checkbox' name="checkBox" className='largerCheckbox'/>
                                  </div>
                                  </div>
                                  </div>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      </div>
                      {provided.placeholder}
                      {console.log("provided.placeholder",provided.placeholder)}
                      {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                        <div
                          className="placeholder"
                          style={{
                          top: placeholderProps.clientY,
                          left: placeholderProps.clientX,
                          height: placeholderProps.clientHeight,
                          width: placeholderProps.clientWidth
                        }}
                        />
                        )}
                    </div>
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
