"use strict";

var moment = require('moment');
var Schedule = require('../models/Schedule');
var Shift = require('../models/Shift');
var messageService = require('./MessageService');

class SchedulerService {
  constructor() {}

  requestSwap(shift, swappers) {
    var msgPromises = _.map(swappers, (swapper) => {
      let message = this.createSwapMessage(shift, swapper);
      return messageService.create(message, shift.employee);
    });
    return Promise.all(msgPromises);
  }

  createSwapMessage(shift, swapper) {
    return {
      content: {
        title: 'Requesting to Swap a Shift',
        body: 'I would like to swap with you my shift from ' + shift.starttime + ' to ' + shift.endtime + ' as ' + shift.role + ' with your shift ' +
          +swapper.starttime + ' to ' + swapper.endtime + ' as ' + swapper.role
      },
      to: swapper.employee,
      actions: [{
        name: 'Agree to Swap',
        url: '/schedule/api/swap',
        data: {
          shift, swapper
        }
      }]
    };
  }

  //TODO restrict on matches (much logic!!)
  findPossibleSwappers(shift) {
    return Shift.find({
      employee: {
        $ne: shift.employee
      }
    });
  }

  //TODO restrict on week
  findSchedules(dateInWeek) {
    return Schedule.find();
  }

  createShift(shift) {
    shift.scheduleDate = this.zeroTime(shift.scheduleDate);
    shift.starttime = this.resetBaseDate(shift.starttime, shift.scheduleDate);
    shift.endtime = this.resetBaseDate(shift.endtime, shift.scheduleDate);

    return Schedule.findOne({
        scheduleDate: shift.scheduleDate
      })
      .then((schedule) => {
        if (!schedule) {
          return this.createNewSchedule({
            scheduleDate: shift.scheduleDate,
            shifts: []
          });
        } else {
          return Promise.resolve(schedule);
        }
      })
      .then((schedule) => {
        return Shift.create(shift)
          .then((shift) => {
            schedule.shifts.push(shift);
            return schedule.save();
          });
      });
  }

  createNewSchedule(schedule) {
    return Schedule.create(schedule);
  }

  resetBaseDate(target, base) {
    let baseMom = moment(base);
    return moment(target)
      .year(baseMom.year())
      .month(baseMom.month())
      .date(baseMom.date())
      .toDate();
  }

  zeroTime(date) {
    return moment(date)
      .milliseconds(0)
      .second(0)
      .minute(0)
      .hour(0)
      .toDate();
  }
}

module.exports = new SchedulerService();
