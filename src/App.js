import React from 'react';
import './App.css';
import {Accordion,Card,Container,Button,Row,Col,ProgressBar,ButtonGroup,ButtonToolbar,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar,faRedo } from '@fortawesome/free-solid-svg-icons'
import FullCalendar from '@fullcalendar/react'
import timegridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { animateScroll as scroll } from 'react-scroll'
import Select from 'react-select';
import "./main.scss";
import dayGridPlugin from '@fullcalendar/daygrid';

class App extends React.Component {

  calendarRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      now: 0,
      currCalendar: 1,
      allCalendars: 20,
      semester:null,
      selectedoption: null,
      progressbarcolor: 'info',
      hideGenerate: false,
      courses: '0',
      course1: '',
      course2: '',
      course3: '',
      course4: '',
      crnShow: false,
      animated: true,
      semester_options:[
        {value:'Summer Term: May - Aug 2020', label:'Summer Term: May - Aug 2020'},
        {value:'Second Term: Jan - Apr 2020', label:'Second Term: Jan - Apr 2020'},
        {value:'First Term: Sep - Dec 2019', label:'First Term: Sep - Dec 2019'}
      ],
      eventShow: false,
      deletePopup: false,
      events: [{
      }],
      courses_bio:[
        {value:'BIOL 184',label:'BIOL 184'},
        {value:'BIOL 186',label:'BIOL 186'},
        {value:'CHEM 101',label:'CHEM 101'},
        {value:'MATH 100', label: 'MATH 100'},
        {value:'MATH 109', label: 'MATH 109'},
        {value:'MATH 102', label:'MATH 102'},
        {value:'MATH 151', label: 'MATH 151'},
        {value:'PHYS 102A', label:'PHYS 102A'},
        {value:'PHYS 102B', label:'PHYS 102B'},
        {value:'PHYS 110', label:'PHYS 110'},
        {value:'PHYS 111', label:'PHYS 111'},
        {value:'PHYS 120', label:'PHYS 120'},
        {value:'PHYS 130', label:'PHYS 130'},
        {value:'Elective', label: 'Elective'}
      ]
    };
    this.courses = this.courses.bind(this);
    this.changeSemester = this.changeSemester.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.addEventDrag = this.addEventDrag.bind(this);
    this.course1update = this.course1update.bind(this);
    this.course2update = this.course2update.bind(this);
    this.course3update = this.course3update.bind(this);
    this.course4update = this.course4update.bind(this);
    this.minus = this.minus.bind(this);
    this.plug = this.plus.bind(this);
    this.minusTotal = this.minusTotal.bind(this);
  }
  
  minusTotal = () => {
    this.setState({
      allCalendars: this.state.allCalendars - 1,
      currCalendar: 1,
      deletePopup: false
    })
  }

  minus = () => {
    console.log(this.state.currCalendar)
    if(this.state.currCalendar === 1) {
      this.setState({
        currCalendar: 20
      })
    } else {
      this.setState({
        currCalendar: this.state.currCalendar - 1
      })
    }
  }

  plus = () => {
    if(this.state.currCalendar === this.state.allCalendars) {
      this.setState({
        currCalendar: 1 
      })
    } else {
      this.setState({
        currCalendar: this.state.currCalendar + 1
      })
    }
  }

  changeSemester = (semester) => {
    console.log(this.state.semester)
    if(this.state.courses !== '0') {
      this.setState({
        semester:semester,
        now: 33
      })
    } else {
      this.setState({
        semester: 1
      });
    }
  };

  buttonPress = () => {
    this.setState({
      hideGenerate: true,
      now: 100,
      progressbarcolor: 'success',
      animated:false
    })
    scroll.scrollToBottom();
  }


  course1update = (update) => {
    const filterarr = this.state.courses_bio.filter(item => item !== update)
    this.setState({
      course1:update['value'],
      courses_bio: filterarr
    });
    console.log(filterarr)
    if (this.state.now === 33 && this.state.course2 !== '' && this.state.course3 !== '' && this.state.course4 !== '') {
      this.setState({
        now: 66
      })
    }
  }

  course2update = (update) => {
    const filterarr = this.state.courses_bio.filter(item => item !== update)
    this.setState({
      course2:update['value'],
      courses_bio: filterarr
    });
    console.log(filterarr)
    if (this.state.now === 33 && this.state.course1 !== '' && this.state.course3 !== '' && this.state.course4 !== '') {
      this.setState({
        now: 66
      })
    }
  }

  course3update = (update) => {
    const filterarr = this.state.courses_bio.filter(item => item !== update)
    this.setState({
      course3: update['value'],
      courses_bio: filterarr
    });
    if(this.state.now === 33 && this.state.course1 !== '' && this.state.course2 !== '' && this.state.course4 !== '') {
      this.setState({
        now: 66
      })
    }
    console.log(filterarr)
  }
  
  course4update = (update) => {
    const filterarr = this.state.courses_bio.filter(item => item !== update)
    this.setState({
      course4:update['value'],
      courses_bio: filterarr,
    });
    if(this.state.now === 33 && this.state.course1 !== '' && this.state.course2 !== '' && this.state.course3 !== '') {
      this.setState({
        now: 66,
        progressbarcolor: 'info'
      })
    }
    console.log(filterarr)
  }

  addEvent(info) {
    console.log(info.startStr)
    console.log(info.endStr)
    const tmparr = {
      title: 'Unavailable', 
      start: info.startStr, 
      end: info.endStr }
    const tmparrState = this.state.events
    tmparrState.push(tmparr);
    console.log(tmparrState[2])
    this.setState ({
       events: tmparrState
    });
    console.log(this.state.events.length)
    console.log(this.state.events)
  }

  courses = (num_courses) => {
    console.log(this.state.semester)
    if(this.state.semester !== null) {
      this.setState({
        courses: num_courses['value'],
        now: 33,
        progressbarcolor: ''
    })
    } else {
      this.setState({
        courses: num_courses['value'],
        progressbarcolor: ''
      })
    }

  }

  render() {
    const buttonPressStyle = (this.state.hideGenerate) ? {display:'none'} : {};
    return (
      <div className="App">
        <div className="info">
          <div className="my-form"></div>
          <Container>
            <Row >
              <Col xs lg="4">
                <div className='pinfo'>Name:</div>
                <div className='pinfo'>Program:</div>
                <div className='pinfo'>Academic Standing:</div>
                <div className='pinfo'>Current Year:</div>
                <div className='pinfo'>Credit Count:</div>
              </Col>
              <Col xs lg='6'>
                <div className='pinfo'>Jane Doe</div>
                <div className='pinfo'>Biology</div>
                <div className='pinfo'>Good</div>
                <div className='pinfo'>First Year</div>
                <div className='pinfo'>0.0</div>
              </Col>
              <Col>
                {/* <img src={uvic} id='calendarphoto' alt="calendar"></img> */}
                <FontAwesomeIcon size='8x' icon={faCalendar}/>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="ProgressBar">
          <ProgressBar variant={this.state.progressbarcolor} animated={this.state.animated} now={this.state.now} label={this.state.now+'%'} />
        </div>
        <p></p>
        {/* Semester and number of courses field */}
        <Container> 
          <Row>
            <Col>
            <div>Semester</div>
            </Col>
            <Col><div>Number of Courses</div></Col>
          </Row>
          <Row>
            <Col>
              <Select 
                options={this.state.semester_options} 
                onChange={this.changeSemester} />
            </Col>
            <Col>
              <Select options={[{
              value:'1', label:'1'},
              {value:'2', label:'2'},
              {value:'3', label:'3'},
              {value:'4', label:'4'},
              {value:'5', label:'5'},
              {value:'6', label:'6'}]} 
                onChange={this.courses}
              /></Col>
          </Row>
          <br></br>
        </Container>
        {/*  Num of courses based on number of courses field in the past*/}
        <Container>
          <div>
          {(this.state.now >= 33) ? 
          (
            <Container>
              <Row>
                <Col>Course 1</Col>
                <Col>Course 2</Col>
                <Col>Course 3</Col>
                <Col>Course 4</Col>
              </Row>
              <Row>
                <Col>
                  <Select options={this.state.courses_bio} onChange={this.course1update}/>
                </Col>
                <Col>
                  <Select options={this.state.courses_bio} onChange={this.course2update} />
                </Col>
                <Col>
                  <Select options={this.state.courses_bio} onChange={this.course3update}/>
                </Col>
                <Col>
                  <Select options={this.state.courses_bio} onChange={this.course4update} />
                </Col>
              </Row>
            </Container>
          ): <div></div>}
        </div>
        </Container>
        <br></br>
        <div> {(this.state.course1 !== '' && this.state.course2 !== '' && this.state.course3 !== '' && this.state.course4 !== '') ? 
        // true
        ( 
        <Container> 
          Optional
          <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" onChange={this.course1update}>
              Specific Course Sections
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  <Row>
                    <Col>Lecture Sections</Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className='accdropdown'>
                        <Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                        {'value': 'All', 'label': 'All'},
                        {'value': this.state.course1 + ' A01', 'label': this.state.course1 +' A01'},
                        {'value': this.state.course1 + ' A02', 'label': this.state.course1 +' A02'}
                        ]}/>
                      </div>
                    </Col>
                    <Col><Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                      {'value':'All', 'label':'All'},
                      {'value':this.state.course2 +' A01', 'label': this.state.course2 +' A01'},
                      {'value':this.state.course2 +' A02' , 'label': this.state.course2 +' A02' },
                    ]}/></Col>
                    <Col><Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                      {'value': 'All', 'label':'All'},
                      {'value': this.state.course3 +' A01', 'label': this.state.course3 + ' A01'},
                      {'value': this.state.course3 +' A02', 'label': this.state.course3 +' A02'}
                    ]} /></Col>
                    <Col><Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                      {'value': 'All', 'label': 'All'},
                      {'value': this.state.course4 +' A01', label: this.state.course4 +' A01'},
                      {'value': this.state.course4 +' A02', label: this.state.course4 +' A02'}
                    ]} /></Col>

                  </Row>
                  <br></br>
                  <Row>
                    <Col>Labs and Tutorial Sections</Col>
                  </Row>
                  <Row>
                    <Col><Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}  options={[
                      {'value':'All','label':'All'},
                      {'value': this.state.course1 + " B01", 'label':this.state.course1 + " B01"},
                      {'value': this.state.course1 + " B02", 'label': this.state.course1 + " B02"},
                    ]}/></Col>
                    <Col>
                      <Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                        {'value':'All','label': 'All'},
                        {'value': this.state.course2 + ' TO1', 'label': this.state.course2 + ' T01'},
                        {'value': this.state.course2 + ' T02', 'label': this.state.course2 + ' T02'}
                      ]} />
                    </Col>
                    <Col>
                      <Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                        {'value': 'All', 'label': 'All'},
                        {'value': this.state.course3 + ' B01', 'label': this.state.course3 + ' B01'}
                      ]} />
                    </Col>
                    <Col>
                      <Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                        {'value': 'All', 'label': 'All'},
                        {'value': this.state.course4 + ' B01', 'label': this.state.course4 + ' B01'},
                        {'value': this.state.course4 + ' B02', 'label': this.state.course4 + ' B02'},
                        {'value': this.state.course4 + ' B03', 'label': this.state.course4 + ' B03'}
                      ]}/>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Select All Unavailable Timeslots
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                  <div id="remove_event" className='remove_events'/>
                   Drag to add a time, and click a red space to remove
                  <FullCalendar defaultView="timeGridWeek" 
                    ref={this.calendarRef}
                    columnHeaderFormat = {{
                      weekday:'short'
                    }}
                    plugins={[ timegridPlugin,interactionPlugin ]} 
                    selectable='true'
                    unselectAuto={false}
                    weekends={false}
                    select = {(info) => {
                      this.addEventDrag(info)
                    }}
                    eventClick = {(info) => {
                      info.event.remove()
                    }}
                    displayEventTime = {false}
                    eventColor =  'red'
                    eventTextColor = 'white'
                    header = {false}
                    minTime="7:00am" 
                    events={this.state.events}
                    />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </Container>) : <div></div>
        }
        <br></br>
        <div style={{textAlign: 'center'}}>
          {(this.state.now === 66) ? 
            <Button onClick={this.buttonPress} style={buttonPressStyle}>Generate!</Button> 
          : <div></div>}
         </div>
         <div>
          {this.state.hideGenerate ?
            <div>
            <h1>Generated Timetables</h1>
            <div>
            {this.state.currCalendar}/{this.state.allCalendars}
            </div>
              <div>
                <ButtonToolbar style={{ marginBottom: '20px' }}>
                  <ButtonGroup className="text-right" aria-label="Basic example" style={{ marginRight: '4px' }} >
                    <Button variant="secondary" onClick={this.minus}>&lt;</Button>
                    <Button variant="secondary" onClick={this.plus}>&gt;</Button>
                  </ButtonGroup>
                  <Button onClick={() => this.setState({
                    crnShow: true
                  })} style={{marginRight: '4px'}} variant="outline-info">CRN Course Codes</Button>
                    <Button style={{ marginRight: '4px' }} variant="outline-primary">Favourite</Button>
                  <Button style={{ marginRight: '4px' }} onClick={() => {
                    this.setState({
                      deletePopup: true
                    })
                  }} variant="outline-danger">Delete</Button>
                    <Modal show={this.state.deletePopup} onHide={() => {
                      this.setState({
                        crnShow: false
                      })
                    }} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this calendar?</Modal.Title>
                      </Modal.Header>
                      <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                          this.setState({
                            deletePopup: false
                          })
                        }}>
                          Cancel
                        </Button>
                        <Button variant="success" onClick={this.minusTotal}>
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  <Modal size="lg" show={this.state.crnShow} onHide={() => this.setState({
                    crnShow:false
                  })} centered>
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          CRN Codes
                       </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Container>
                          <div style={{fontWeight:'bold'}}>Course</div>
                          <Row style={{marginTop:'5px'}}>
                            <Col>{this.state.course1+": 12345"}</Col>
                            <Col>{this.state.course2 + ": 69827"}</Col>
                            <Col>{this.state.course3 + ": 42230"}</Col>
                            <Col>{this.state.course4 + ": 94032"}</Col>
                          </Row>
                          <div style={{fontWeight:'bold', marginTop:'10px'}}>Labs/Tutorials</div>
                          <Row style={{marginTop:'5px'}}>
                            <Col>{this.state.course1+ " B01: 12346"}</Col>
                            <Col>{this.state.course2 + " T02: 69828"}</Col>
                            <Col>{this.state.course3 + " B01: 42231"}</Col>
                            <Col>{this.state.course4 + " B03: 94033"}</Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                  </Modal>
                </ButtonToolbar>
              </div>
            </div> : ""}
          </div>
          <div style={{marginTop: '2px'}}>
          {/* schedule 2 */}
          <div id="schedule2">
            {(this.state.currCalendar === 2 && this.state.hideGenerate) ? (
            <div style={{marginTop:'40px'}}>
              <FullCalendar
                columnHeaderFormat={{
                  weekday: 'short'
                }}
                style={{ marginTop: '20px' }}
                plugins={[timegridPlugin, interactionPlugin, dayGridPlugin]}
                defaultView="timeGridWeek"
                weekends={false}
                maxTime='21:00'
                header={false}
                minTime="7:00am"
                eventTextColor='white'
                allDaySlot={false}
                eventClick={() => {
                   this.setState({
                     eventShow: true
                   })
                  }}
                events={[{ /* event 1 */
                  title: this.state.course1 + " A02",
                  startTime: '08:30',
                  endTime: '09:50',
                  startRecur: '2019-07-06T08:30:00',
                  description:'yeet',
                  color: 'purple',
                  allDay: false,
                  daysOfWeek: [1, 4] // Repeat monday and thursday
                }, { // Event 2
                  title: this.state.course2 + " A01",
                  startTime: '9:30',
                  endTime: '10:20',
                  startRecur: '2019-07-06T08:30:00',
                  color: 'orange',
                  allDay: false,
                  daysOfWeek: [2, 3, 5]
                }, { // Event 3
                  title: this.state.course3 + " A01",
                  startTime: '10:30',
                  endTime: '11:20',
                  startRecur: '2019-07-06T08:30:00',
                  color: 'blue',
                  allDay: false,
                  daysOfWeek: [2, 3, 5]
                }, { // Event 4
                  title: this.state.course4 + " A02",
                  startTime: '13:00',
                  endTime: '14:20',
                  startRecur: '2019-07-01T08:30:00',
                  color: 'gray',
                  allDay: false,
                  daysOfWeek: [1, 4]
                }, {
                  title: this.state.course4 + " B01",
                  startTime: '13:00',
                  endTime: '14:20',
                  startRecur: '2019-07-01T08:30:00',
                  color: 'rgb(186, 180, 180)',
                  allDay: false,
                  daysOfWeek: [5],
                  borderColor: 'black'
                }, {
                  title: this.state.course2 + " T03",
                  startTime: '11:30',
                  endTime: '12:20',
                  startRecur: '2019-07-01T08:30:00',
                  color: 'rgb(252, 207, 128)',
                  allDay: false,
                  daysOfWeek: [3],
                  borderColor: 'black'
                }, {
                  title: this.state.course3 + " B01",
                  startTime: '14:00',
                  endTime: '15:20',
                  startRecur: '2019-07-01T08:30:00',
                  color: 'rgb(125, 116, 252)',
                  allDay: false,
                  daysOfWeek: [2],
                  borderColor: 'black'
                }, {
                  title: this.state.course1 + " B01",
                  startTime: '10:00',
                  endTime: '12:50',
                  startRecur: '2019-07-01T08:30:00',
                  color: 'rgb(183, 91, 183)',
                  allDay: false,
                  daysOfWeek: [1],
                  borderColor: 'black'
                }, {
                  title: 'no class',
                  startTime: '7:00',
                  endTime: '8:30',
                  startRecur: '2019-07-01T08:30:00',
                  daysOfWeek: [1,2,3,4,5],
                  color: 'red'
                }
                ]} />
                <Modal
                  size="sm"
                  show={this.state.eventShow}
                  onHide={() => this.setState({
                    eventShow: false
                  })}
                  aria-labelledby="example-modal-sizes-title-sm"
                 >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      {this.state.course1}
                </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <Container style={{textAlign:'center'}}>
                        <Row>
                          <Col><div style={{color:'red'}}>M</div></Col>
                          <Col>T</Col>
                          <Col>W</Col>
                          <Col><div style={{ color: 'red' }}>R</div></Col>
                          <Col>F</Col>
                        </Row>
                      </Container>
                      <p></p>
                      <div>Time: 8:30 - 9:50</div>
                      <div>Building: ECS 123</div>
                      <div>Prof: Mr. Buchko</div>
                      <div>CRN: 12836</div>
                      <a href="https://web.uvic.ca/calendar2019-05/CDs/BIOL/184.html" target="__blank">Course Info</a>
                    </div>
                  </Modal.Body>
                </Modal>
              <div style={{marginTop:'20px',marginBottom:'50px'}}>
                <Button variant="light" style={{marginRight:'10px'}} onClick={() => window.location.reload()}>
                  <FontAwesomeIcon size='sm' icon={faRedo} />
                </Button>
                <Button style={{marginRight:'10px'}} variant="info">
                  View All Favourited Timetables
                </Button>
                <Button style={{marginRight:'10px'}} variant="success">
                  Favourite Timetable and save CRN Codes
                </Button>
              </div>
            </div>
            )  
            : ""}
          </div>
          {/* Schedule 1 */}
          <div>
            {(this.state.currCalendar === 1 && this.state.hideGenerate) ? (
              <div style={{ marginTop: '40px' }}>
                <FullCalendar
                  columnHeaderFormat={{
                    weekday: 'short'
                  }}
                  style={{ marginTop: '20px' }}
                  plugins={[timegridPlugin, interactionPlugin, dayGridPlugin]}
                  defaultView="timeGridWeek"
                  weekends={false}
                  maxTime='21:00'
                  header={false}
                  minTime="7:00am"
                  eventTextColor='white'
                  allDaySlot={false}
                  eventClick={() => {
                    this.setState({
                      eventShow: true
                    })
                  }}
                  events={[{ /* event 1 */
                    title: this.state.course1 + " A01",
                    startTime: '10:30',
                    endTime: '11:50',
                    startRecur: '2019-07-06T08:30:00',
                    color: 'purple',
                    allDay: false,
                    daysOfWeek: [1, 4] // Repeat monday and thursday
                  }, { // Event 2
                    title: this.state.course2 + " A02",
                    startTime: '12:00', 
                    endTime: '13:20',
                    startRecur: '2019-07-06T08:30:00',
                    color: 'orange',
                    allDay: false,
                    daysOfWeek: [2, 3, 5]
                  }, { // Event 3
                    title: this.state.course3 + " A03",
                    startTime: '9:20',
                    endTime: '10:30',
                    startRecur: '2019-07-06T08:30:00',
                    color: 'blue',
                    allDay: false,
                    daysOfWeek: [2, 3, 5]
                  }, { // Event 4
                    title: this.state.course4 + " A02",
                    startTime: '13:00',
                    endTime: '14:20',
                    startRecur: '2019-07-01T08:30:00',
                    color: 'gray',
                    allDay: false,
                    daysOfWeek: [1, 4]
                  }, {
                    title: this.state.course4 + " B01",
                    startTime: '13:30',
                    endTime: '14:50',
                    startRecur: '2019-07-01T08:30:00',
                    color: 'rgb(186, 180, 180)',
                    allDay: false,
                    daysOfWeek: [5],
                    borderColor: 'black'
                  }, {
                    title: this.state.course2 + " T03",
                    startTime: '13:30',
                    endTime: '14:20',
                    startRecur: '2019-07-01T08:30:00',
                    color: 'rgb(252, 207, 128)',
                    allDay: false,
                    daysOfWeek: [3],
                    borderColor: 'black'
                  }, {
                    title: this.state.course3 + " B01",
                    startTime: '14:30',
                    endTime: '15:50',
                    startRecur: '2019-07-01T08:30:00',
                    color: 'rgb(125, 116, 252)',
                    allDay: false,
                    daysOfWeek: [2],
                    borderColor: 'black'
                  }, {
                    title: this.state.course1 + " B01",
                    startTime: '14:30',
                    endTime: '17:20',
                    startRecur: '2019-07-01T08:30:00',
                    color: 'rgb(183, 91, 183)',
                    allDay: false,
                    daysOfWeek: [1],
                    borderColor: 'black'
                    }, {
                      title: 'no class',
                      startTime: '7:00',
                      endTime: '8:30',
                      startRecur: '2019-07-01T08:30:00',
                      daysOfWeek: [1, 2, 3, 4, 5],
                      color: 'red'
                    }
                  ]} />
                <Modal
                  size="sm"
                  show={this.state.eventShow}
                  onHide={() => this.setState({
                    eventShow: false
                  })}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      {this.state.course1}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <Container style={{ textAlign: 'center' }}>
                        <Row>
                          <Col><div style={{ color: 'red' }}>M</div></Col>
                          <Col>T</Col>
                          <Col>W</Col>
                          <Col><div style={{ color: 'red' }}>R</div></Col>
                          <Col>F</Col>
                        </Row>
                      </Container>
                      <p></p>
                      <div>Time: 8:30 - 9:50</div>
                      <div>Building: ECS 123</div>
                      <div>Prof: Mr. Buchko</div>
                      <div>CRN: 12836</div>
                      <a href="https://web.uvic.ca/calendar2019-05/CDs/BIOL/184.html" target="__blank">Course Info</a>
                    </div>
                  </Modal.Body>
                </Modal>
                <div style={{ marginTop: '20px', marginBottom: '50px' }}>
                  <Button variant="light" style={{ marginRight: '10px' }} onClick={() => window.location.reload()}>
                    <FontAwesomeIcon size='sm' icon={faRedo} />
                  </Button>
                  <Button style={{ marginRight: '10px' }} variant="info">
                    View All Favourited Timetables
                </Button>
                  <Button style={{ marginRight: '10px' }} variant="success">
                    Favourite Timetable and save CRN Codes
                </Button>
                </div>
              </div>
            )
              : ""}
          </div>
          </div>
        </div>
        
      </div>
    );
  }
  addEventDrag(info) {
    let calendarApi = this.calendarRef.current.getApi()
    calendarApi.addEvent({
      title: 'Unavailable',
      start: info.startStr,
      end: info.endStr,
      allday: 'false'
    })
  }
}


export default App