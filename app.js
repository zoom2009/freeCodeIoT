const express = require('express')
const bodyParser = require('body-parser')
const distance = require('gps-distance')

const {mongoose} = require('./db/mongoose')
//Schema
var {CAR} = require('./Schema/CARSchema')
var {STUDENT} = require('./Schema/STUDENTSchema')
var {STATION} = require('./Schema/STATIONSchema')
var {ROUTE_DETAIL} = require('./Schema/ROUTE_DETAILSchema')
var {GET_IN_OUT_CAR} = require('./Schema/GET_IN_OUT_CARSchema')
var {CAR_STATE} = require('./Schema/CAR_STATESchema')
var {CAR_CURRENT_LOCATION} = require('./Schema/CAR_CURRENT_LOCATIONSchema')

var app = express()
app.use(bodyParser.json())

var stationsFN = (lat, lng, fn) => {
  STATION.find().then((sta) => {
    for(let i=0;i<sta.length;i++){
      if((distance(lat, lng, sta[i].lat, sta[i].lng)*1000) <= 15){
        fn(sta[i].stationID)
        return
      }
    }
    fn(undefined, 'Not Found this lat, lng ('+lat+', '+lng+') match in staion database')
  }, (e) => {
     console.log('!!! Error to STATION.find() !!!', e)
  })
}

// stationsFN(8.64468, 99.89369, (station, e) => {
//   if(station){
//     console.log('Found station <'+station+'> matched')
//   }else{
//     console.log(e)
//   }
// })

var datetimeToTimeMS = function(timeIn){
  let timeString = timeIn.split(' ', 2)
  let times = timeString[1].split(':', 3)
  let hr = times[0]*60*60
  let min = times[1]*60
  let sec = times[2]

  return hr+min+sec
}

//========================== HTTP POST ===================
app.post('/CAR', (req, res) => {
  let newCAR = new CAR({
    carID: req.body.carID,
    startStation: req.body.startStation,
    finishStation: req.body.finishStation
  })
  newCAR.save().then((doc) => {
    res.send('is saved to db '+doc)
  }, (e) => {
    res.status(400).send('can not save to db '+e)
  })
})

app.post('/STUDENT', (req, res) => {
  let newSTUDENT = new STUDENT({
    RFID: req.body.RFID,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  newSTUDENT.save().then((doc) => {
    res.send('is saved to db '+doc)
  }, (e) => {
    res.status(400).send('can not save to db '+e)
  })
})

//EX_3.4.3
app.post('/STATION', (req, res) => {
  let newSTATION = new STATION({
    stationID: req.body.stationID,
    name: req.body.name,
    lat: req.body.lat,
    lng: req.body.lng
  })
  newSTATION.save().then((doc) => {
    res.send('is saved to db '+doc)
  }, (e) => {
    res.status(400).send('can not save to db '+e)
  })
})

//EX_3.4.4
app.post('/ROUTE_DETAIL', (req, res) => {
  let newROUTE_DETAIL = new ROUTE_DETAIL({
    carID: req.body.carID,
    index: req.body.index,
    from: req.body.from,
    to: req.body.to
  })
  newROUTE_DETAIL.save().then((doc) => {
    res.send('is saved to db '+doc)
  }, (e) => {
    res.status(400).send('can not save to db '+e)
  })
})

//EX_5
app.post('/GET_IN_OUT_CAR', (req, res) => {
  stationsFN(parseFloat(req.body.lat), parseFloat(req.body.lng), (station, err) => {
    if(station){
      let newGET_IN_OUT_CAR = new GET_IN_OUT_CAR({
        RFID: req.body.RFID,
        carID: req.body.carID,
        in_out: req.body.in_out,
        stationID: station,
        dateTime: req.body.dateTime
      })
      newGET_IN_OUT_CAR.save().then((doc) => {
        res.send('is saved to db '+doc)
      }, (e) => {
        res.status(400).send('can not save to db '+e)
      })
    }else{
      res.status(400).send(err)
    }
  })
})

//EX_3.2.1
app.post('/CAR_STATE', (req, res) => {
  let newCAR_STATE = new CAR_STATE({
    carID: req.body.carID,
    status: req.body.status,
    seats: req.body.seats,
    dateTime: req.body.dateTime
  })
  newCAR_STATE.save().then((doc) => {
    res.send('is saved to db '+doc)
  }, (e) => {
    res.status(400).send('can not save to db '+e)
  })
})
//EX_3.2.2
app.post('/CAR_CURRENT_LOCATION', (req, res) => {
  let newCAR_CURRENT_LOCATION = new CAR_CURRENT_LOCATION({
    carID: req.body.carID,
    lat: req.body.lat,
    lng: req.body.lng,
    dateTime: req.body.dateTime
  })
  newCAR_CURRENT_LOCATION.save().then((doc) => {
    res.send('is saved to db '+doc)
  }, (e) => {
    res.status(400).send('can not save to db '+e)
  })
})

//========================== HTTP GET ===================
app.get('/', (req, res) => {
  res.send('GET/POST API <part><br /><br />  /CAR<br />  /STUDENT<br />  /STATION'+
  '<br />  /ROUTE_DETAIL<br />  /GET_IN_OUT_CAR<br />  /CAR_STATE<br />  /CAR_CURRENT_LOCATION'+
  '<br />========================<br />Query Get API<br /><br />  /GET_IN_OUT_CAR/:inOut<br />  /CAR_STATE/:id<br />  '+
  '/GET_IN_OUT_CAR/:startTime/:endTime<br />========================<br />DROP Model<br /><br />  /drop/:modelName<br /><br />post dummy = /GET_IN_OUT_CAR_dummy')
})

app.get('/CAR', (req, res) => {
  CAR.find().then((cars) => {
    res.send(cars)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/STUDENT', (req, res) => {
  STUDENT.find().then((students) => {
    res.send(students)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/STATION', (req, res) => {
  STATION.find().then((stations) => {
    res.send(stations)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/ROUTE_DETAIL', (req, res) => {
  ROUTE_DETAIL.find().then((route_details) => {
    res.send(route_details)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/GET_IN_OUT_CAR', (req, res) => {
  GET_IN_OUT_CAR.find().then((in_outs) => {
    res.send(in_outs)
  }, (e) => {
    res.status(400).send(e)
  })
})

//EX_3.4.2
app.get('/CAR_STATE', (req, res) => {
  CAR_STATE.find().then((car_states) => {
    res.send(car_states)
  }, (e) => {
    res.status(400).send(e)
  })
})

//EX_3.4.1
app.get('/CAR_CURRENT_LOCATION', (req, res) => {
  CAR_CURRENT_LOCATION.find().then((carCurrentLocations) => {
    res.send(carCurrentLocations)
  }, (e) => {
    res.status(400).send(e)
  })
})

//===================================================================
//Query
//EX_3.3.1 & EX_3.3.2
app.get('/GET_IN_OUT_CAR/:inOut', (req, res) => {
  GET_IN_OUT_CAR.find({
    in_out: req.params.inOut
  }).then((in_outs) => {
    res.send(in_outs)
  }, (e) => {
    res.status(400).send(e)
  })
})
//EX_3.3.3
app.get('/CAR_STATE/:id', (req, res) => {
  CAR_STATE.find({
    carID: req.params.id
  }).then((car_states) => {
    res.send(car_states)
  }, (e) => {
    res.status(400).send(e)
  })
})

//drop-data
app.get('/drop-db', (req, res) => {
  mongoose.connection.db.dropDatabase(function(err, result){
        if(result){
          res.send(result)
        }else if(err){
          res.send(err)
        }
  })
})

app.get('/drop-student', (req, res) => {
    STUDENT.remove().then((s) => {res.send(s)})
})

app.get('/drop-car', (req, res) => {
    CAR.remove().then((s) => {res.send(s)})
})

app.get('/drop-station', (req, res) => {
    STATION.remove().then((s) => {res.send(s)})
})

app.get('/drop-route_detail', (req, res) => {
    ROUTE_DETAIL.remove().then((s) => {res.send(s)})
})

app.get('/drop-car_state', (req, res) => {
    CAR_STATE.remove().then((s) => {res.send(s)})
})

app.get('/drop-get_in_out_car', (req, res) => {
    GET_IN_OUT_CAR.remove().then((s) => {res.send(s)})
})

app.get('/drop-car_current_location', (req, res) => {
    CAR_CURRENT_LOCATION.remove().then((s) => {res.send(s)})
})


app.listen(process.env.PORT || 4000, () => {
  console.log('listen on port 4000')
})
