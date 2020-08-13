const pool = require('../../database/pool');
const conn = require('../lib/conn');
const notificationQuery = require('../../queries/notification/notificationQuery');


const createNotificationDAO = async (create_data) => {
  if ((create_data === "undefined") || (create_data === "")) {
    return res.status(200).json({ statusCode: 502, message: '잘못된 매개변수 타입' });
	}
  let data = await conn.connection(notificationQuery.insertNotificationQuery, create_data);
  return data;
}

const createUserNotificationDAO = async (reqDataObject) => {
  let notiId = null;
  let requestTime = reqDataObject.time;
  let senderUsn = reqDataObject.mentorUsn;
  let receiverUsn = reqDataObject.menteeUsn;
  let matchingId = reqDataObject.matchingId;
  // if ((create_data === "undefined") || (create_data === "")) {
  //   return res.status(200).json({ statusCode: 502, message: '잘못된 매개변수 타입' });
	// }
  let notificationCreateBindValue = [
    notiId, requestTime, senderUsn, receiverUsn, matchingId
  ];
  let DBData = await conn.connection(notificationQuery.insertUserNotificationQuery, notificationCreateBindValue);
  return DBData;
}

const getUserNotificationDAO = async (reqDataObject) => {
  let usn = reqDataObject.usn;
  let userType = reqDataObject.type;

  let whereClause = userType ? `mentor_USN = ? ` : `mentee_USN = ? `;
  let getUserNotificationBindValue = [ usn ];
  let query = notificationQuery.getUserNotificationQuery
            + whereClause
            + notificationQuery.getUserNotificationQueryOrderBy;
  let DBData = await conn.connection(query, getUserNotificationBindValue);
  console.log(DBData);
  return DBData;
}

module.exports = {
  createNotificationDAO,
  createUserNotificationDAO,
  getUserNotificationDAO,
}
