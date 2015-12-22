"use strict";

var Shift = require('../models/Shift');

class ScheduleService {
  constructor() {
  }

  findSwappers(shift){
    return [{
      employee: 'tiffy',
      scheduleDate: '2015-12-25',
      starttime: '8:00am',
      endtime: '4:00pm',
      role: 'Cook'
    },
    {
      employee: 'mandy',
      scheduleDate: '2015-12-26',
      starttime: '9:00am',
      endtime: '5:00pm',
      role: 'Driver'
    }];
  }

  findSchedules(employee, dateInWeek){
    return [{
        scheduleDate: '2015-12-21',
        dayName: 'Monday',
        shifts: [{
          employee: 'niko',
          scheduleDate: '2015-12-21',
          starttime: '8:00am',
          endtime: '4:00pm',
          role: 'Cook'
        }]
      },

      {
        scheduleDate: '2015-12-22',
        dayName: 'Tuesday',
        shifts: [{
          employee: 'niko',
          scheduleDate: '2015-12-22',
          starttime: '8:00am',
          endtime: '4:00pm',
          role: 'Driver'
        }]
      },

      {
        scheduleDate: '2015-12-24',
        dayName: 'Thursday',
        shifts: [{
          employee: 'niko',
          scheduleDate: '2015-12-24',
          starttime: '8:00am',
          endtime: '12:00pm',
          role: 'Driver'
        }, {
          employee: 'niko',
          starttime: '12:00pm',
          endtime: '5:00pm',
          role: 'Cook'
        }]
      }
    ];
  }
}

module.exports = ScheduleService;
