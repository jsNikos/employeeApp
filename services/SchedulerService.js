"use strict";

var moment = require('moment');
var _ = require('lodash');
var Schedule = require('../models/Schedule');
var Shift = require('../models/Shift');
var messageService = require('./MessageService');

class SchedulerService {
  constructor() {}

  swap(message) {
    let data = _.find(message.actions, {
      type: 'swap'
    }).data;

    return Promise
      .all([
        Shift.findOne(data.swapper).populate('employee role'),
        Shift.findOne(data.shift).populate('employee role')
      ])
      .then((result) => {
        let swapper = result[0];
        let shift = result[1];
        let swapperEmployee = swapper.employee;
        let requestSwapEmployee = shift.employee;
        swapper.employee = shift.employee;
        shift.employee = swapperEmployee;
        return Promise.all([
          swapper.save(),
          shift.save(),
          messageService.create(this.createSwapConfirmMessage(shift, swapper), swapperEmployee),
          messageService.removeSwapRequests(message.from._id, data.shift._id)  // needs to be done, because ObjectId don't match the string equivalent
        ]);
      });
  }

  requestSwap(shift, swappers) {
    var msgPromises = _.map(swappers, (swapper) => {
      let message = this.createSwapMessage(shift, swapper);
      return messageService.create(message, shift.employee);
    });
    return Promise.all(msgPromises);
  }

  createSwapConfirmMessage(shift, swapper) {
    return {
      content: {
        title: 'Your request for swapping a shift has been agreed',
        body: shift.employee.name + ' has agreed to swap with you his shift ' +
          this.formatScheduleDate(swapper.scheduleDate) + ' from ' + this.formatShiftTime(swapper.starttime) + ' to ' +
          this.formatShiftTime(swapper.endtime) + ' as ' + swapper.role.name + ' with your shift ' +
          ' at ' + this.formatScheduleDate(shift.scheduleDate) + ' ' +
          this.formatShiftTime(shift.starttime) + ' to ' +
          this.formatShiftTime(shift.endtime) + ' as ' + shift.role.name
      },
      to: swapper.employee
    };
  }

  createSwapMessage(shift, swapper) {
    return {
      content: {
        title: 'Requesting to Swap a Shift',
        body: 'I would like to swap with you my shift at ' +
          this.formatScheduleDate(shift.scheduleDate) + ' from ' + this.formatShiftTime(shift.starttime) + ' to ' +
          this.formatShiftTime(shift.endtime) + ' as ' + shift.role.name + ' with your shift ' +
          ' at ' + this.formatScheduleDate(swapper.scheduleDate) + ' ' +
          this.formatShiftTime(swapper.starttime) + ' to ' +
          this.formatShiftTime(swapper.endtime) + ' as ' + swapper.role.name
      },
      to: swapper.employee,
      actions: [{
        name: 'Agree to Swap',
        type: 'swap',
        url: '/schedule/api/swap',
        data: {
          shift, swapper
        }
      }]
    };
  }

  formatShiftTime(date) {
    return moment(date).format('h:mm a');
  }

  formatScheduleDate(date) {
    return moment(date).format('dddd do of MMM YYYY');
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
