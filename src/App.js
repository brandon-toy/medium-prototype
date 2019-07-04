import React from 'react';
import './App.css';
import {Accordion,Card,Container,Dropdown,Row,Col,ProgressBar} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: 0,
      semester:null,
      selectedoption: null,
      progressbarcolor: 'info',
      courses: '0',
      course1: '',
      course2: '',
      course3: '',
      course4: '',
      semester_options:[
        {value:'Summer Term: May - Aug 2020', label:'Summer Term: May - Aug 2020'},
        {value:'Second Term: Jan - Apr 2020', label:'Second Term: Jan - Apr 2020'},
        {value:'First Term: Sep - Dec 2019', label:'First Term: Sep - Dec 2019'}
      ],
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
    this.course1update = this.course1update.bind(this);
    this.course2update = this.course2update.bind(this);
    this.course3update = this.course3update.bind(this);
    this.course4update = this.course4update.bind(this);
  }

  semesterChange = (semester) => {
    this.setState({
      semester: semester

    });
  };

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


  courses = (num_courses) => {
    this.setState({
      courses:num_courses['value'],
      now: 33,
      progressbarcolor: ''
    })
    console.log(this.state.courses)
  }

  render() {
    const {semester} = this.state;
    return (
      <div className="App">
        <div className="info">
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
          <ProgressBar variant={this.state.progressbarcolor} animated now={this.state.now} label={this.state.now+'%'} />
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
          {(this.state.courses === '4') ? 
          (
            <Container>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
                <Col>3</Col>
                <Col>4</Col>
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
          <Accordion defaultActiveKey="0">
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
                      <div class='accdropdown'>
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
                        {'value': this.state.course1 + ' TO1', 'label': this.state.course1 + ' T01'},
                        {'value': this.state.course2 + ' T02', 'label': this.state.course1 + ' T02'}
                      ]} />
                    </Col>
                    <Col>
                      <Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                        {'value': 'All', 'label': 'All'},
                        {'value': this.state.course1 + ' B01', 'label': this.state.course1 + ' B01'}
                      ]} />
                    </Col>
                    <Col>
                      <Select menuPortalTarget={document.body} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={[
                        {'value': 'All', 'label': 'All'},
                        {'value': this.state.course1 + ' B01', 'label': this.state.course1 + ' B01'},
                        {'value': this.state.course2 + ' B02', 'label': this.state.course2 + ' B02'},
                        {'value': this.state.course3 + ' B03', 'label': this.state.course3 + ' B03'}
                      ]}/>
                    </Col>
                  </Row>
                </Container>

                {/* <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br> */}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Select All Unavailable Timeslots
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>test</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </Container>) : <div></div>
        }</div>
      </div>
    );
  }
}



export default App;
