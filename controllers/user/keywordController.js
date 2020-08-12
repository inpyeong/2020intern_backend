const keywordDAO = require('../../models/user/keywordDAO');
const userKeyword = require('../lib/user_keyword');
const paramsCheck = require('../../lib/paramsCheck');
const lib = require('../lib/createReqDataObject');

const getKeywordController= async (req, res, next) => {
  let usn = parseInt(req.params.usn, 10);

  if(paramsCheck.numberCheck([usn]) === false) {
    return res.status(500).json({ statusCode: 500, message: `Cotroller: 정수가 아닌 파라미터` })
  }
  else if(paramsCheck.omissionCheck([usn])){
    return res.status(500).json({ statusCode: 500, message: `Cotroller: 파라미터 누락` })
  }
  else {
    let userBindValue = [usn];
    let reqDataObject = lib.createReqDataObject(req.params, req.body);
    try {
      let totalResult = await keywordDAO.getTotalKeywordDAO(reqDataObject);
      let recommendResult = await keywordDAO.getRecommendKeywordDAO(reqDataObject);
      let keywordResult = userKeyword.userKeywordLogic(usn, totalResult, recommendResult);
      return res.status(200).send(keywordResult);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

const updateTotalKeywordController = async (req, res, next) => {
  let usn = parseInt(req.params.usn, 10);
  let keyword = req.body.keyword;
  let insertKeywords = req.body.keyword.insertKeywords;
  let deleteKeywords = req.body.keyword.deleteKeywords;

  if(paramsCheck.numberCheck([usn]) === false) {
    return res.status(500).json({ statusCode: 500, message: `Cotroller: 정수가 아닌 파라미터` })
  }
  else if(paramsCheck.omissionCheck([usn, keyword])){
    return res.status(500).json({ statusCode: 500, message: `Cotroller: 파라미터 누락` })
  }
  else {
    let reqDataObject = lib.createReqDataObject(req.params, req.body);

    if (insertKeywords.length === 0) {
      console.log("insertKeywords 없음");
      try {
        let deleteKeywordResult = await keywordDAO.deleteTotalKeywordDAO(reqDataObject);
        return res.status(200).send(deleteKeywordResult);
        //return res.render('career', {usn: usn, career: [...careers]});
      } catch (err) {
        return res.status(501).json(err);
      }
    }

    else if (deleteKeywords.length === 0) {
      console.log("delete_data 없음")
      try {
        let insertKeywordResult = await keywordDAO.insertTotalKeywordDAO(reqDataObject);
        return res.status(200).send(insertKeywordResult);
        //return res.render('career', {usn: usn, career: [...careers]});
      } catch (err) {
        return res.status(501).json(err);
      }
    }

    else {
      console.log("둘 다 길이가 1 이상");
      try {
        let totalKeywordResult = await keywordDAO.updateTotalKeywordDAO(reqDataObject);
        //console.log(_keyword);
        return res.status(200).send(totalKeywordResult);
        //return res.render('career', {usn: usn, career: [...careers]});
      } catch (err) {
        return res.status(501).json(err);
      }
    }
  }
}

const updateRecommendKeywordController = async (req, res, next) => {
  let usn = parseInt(req.params.usn, 10);
  let keyword = req.body.keyword;
  let insertKeywords = req.body.keyword.insertKeywords;
  let deleteKeywords = req.body.keyword.deleteKeywords;

  if(paramsCheck.numberCheck([usn]) === false) {
    return res.status(500).json({ statusCode: 500, message: `Cotroller: 정수가 아닌 파라미터` })
  }
  else if(paramsCheck.omissionCheck([usn, keyword])){
    return res.status(500).json({ statusCode: 500, message: `Cotroller: 파라미터 누락` })
  }
  else {
    if (insertKeywords.length === 0) {
      console.log("insertKeywords 없음");
      let deleteKeywordBindValue = [usn, deleteKeywords];
      try {
        let deleteKeywordResult = await keywordDAO.deleteRecommendKeywordDAO(deleteKeywordBindValue);
        return res.status(200).send(deleteKeywordResult);
        //return res.render('career', {usn: usn, career: [...careers]});
      } catch (err) {
        return res.status(501).json(err);
      }
    }

    else if (deleteKeywords.length === 0) {
      console.log("delete_data 없음")
      let insertKeywordBindValue = [usn, insertKeywords];
      try {
        let insertKeywordResult = await keywordDAO.insertRecommendKeywordDAO(insertKeywordBindValue);
        return res.status(200).send(insertKeywordResult);
        //return res.render('career', {usn: usn, career: [...careers]});
      } catch (err) {
        return res.status(501).json(err);
      }
    }

    else {
      try {
        console.log("둘 다 길이가 1 이상");
        let totalKeywordBindValue = [usn, keyword];
        let totalKeywordResult = await keywordDAO.updateRecommendKeywordDAO(totalKeywordBindValue);
        //console.log(_keyword);
        return res.status(200).send(totalKeywordResult);
        //return res.render('career', {usn: usn, career: [...careers]});
      } catch (err) {
        return res.status(501).json(err);
      }
    }
  }
}

module.exports = {
  getKeywordController,
  updateTotalKeywordController,
  updateRecommendKeywordController,
}
