import { normalize } from 'normalizr';

import { issueSchema } from '../schemas/';
import * as types from '../constants';

function setIssuesFetchState(value) {
  return {
    type: types.SET_ISSUES_FETCH_STATE,
    payload: value,
  };
}

function searchIssuesBySummary(query) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const currentProjectKey = getState().projects.meta.get('selected');
    const jiraClient = getState().jira.client;
    const escapedQuery = query.replace('[', '').replace(']', '');
    jiraClient.search.search({
      jql: `project = ${currentProjectKey} AND\
            summary ~ "${escapedQuery}"`,
      maxResults: 1000,
      fields: ['summary', 'resolution', 'status', 'worklog'],
    }, (error, response) => {
      if (error) reject(error);
      const issues = response.issues;
      const normalizedData = normalize(issues, [issueSchema]);
      dispatch({
        type: types.ADD_ISSUES,
        payload: {
          map: normalizedData.entities.issues,
          ids: normalizedData.result,
        },
      });
      dispatch({
        type: types.FILL_SEARCH_ISSUES,
        payload: normalizedData.result,
      });
      if (normalizedData.entities.worklogs) {
        dispatch({
          type: types.ADD_WORKLOGS,
          payload: {
            map: normalizedData.entities.worklogs,
            ids: Object.keys(normalizedData.entities.worklogs),
          },
        });
      }
      dispatch(setIssuesFetchState(false));
      resolve('done');
    });
  });
}

function searchIssuesByKey(query) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const currentProjectKey = getState().projects.meta.get('selected');
    const jiraClient = getState().jira.client;
    jiraClient.search.search({
      jql: `project = ${currentProjectKey} AND\
            issuekey = "${query}"`,
      maxResults: 1000,
      fields: ['summary', 'resolution', 'status', 'worklog'],
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        const issues = response.issues;
        const normalizedData = normalize(issues, [issueSchema]);
        dispatch({
          type: types.ADD_ISSUES,
          payload: {
            map: normalizedData.entities.issues,
            ids: normalizedData.result,
          },
        });
        dispatch({
          type: types.FILL_SEARCH_ISSUES,
          payload: normalizedData.result,
        });
        dispatch({
          type: types.ADD_WORKLOGS,
          payload: {
            map: normalizedData.entities.worklogs,
            ids: Object.keys(normalizedData.entities.worklogs),
          },
        });
        dispatch(setIssuesFetchState(false));
        resolve('done');
      }
    });
  });
}

export function searchIssues(query) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    if (query.length) {
      dispatch(setIssuesFetchState(true));
      searchIssuesByKey(query)(dispatch, getState)
        .catch(
          err => searchIssuesBySummary(query)(dispatch, getState)
        );
    }
  });
}

export function fetchLastWeekLoggedIssues() {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch(setIssuesFetchState(true));
    const jiraClient = getState().jira.client;
    const currentProjectKey = getState().projects.meta.get('selected');
    const self = getState().jira.self;
    jiraClient.search.search({
      jql: `project = ${currentProjectKey} AND\
            worklogAuthor = ${self.get('key')} AND\
            timespent > 0 AND\
            worklogDate >= '-4w'`,
      maxResults: 1000,
      fields: ['summary', 'resolution', 'status', 'worklog'],
    }, (error, response) => {
      if (error) {
        dispatch({
          type: types.THROW_ERROR,
          error,
        });
        reject(error);
        return;
      } else if (response.issues.length) {
        const issues = Array.from(response.issues);
        const normalizedData = normalize(issues, [issueSchema]);
        dispatch({
          type: types.FILL_RECENT_ISSUES,
          payload: {
            map: normalizedData.entities.issues,
            ids: normalizedData.result,
          },
        });
        dispatch({
          type: types.FILL_WORKLOGS,
          payload: {
            map: normalizedData.entities.worklogs,
            ids: Object.keys(normalizedData.entities.worklogs || {}),
          },
        });
        dispatch({
          type: types.FILL_RECENT_WORKLOGS,
          payload: Object.keys(normalizedData.entities.worklogs || {}),
        });
        dispatch(setIssuesFetchState(false));
      }
    });
  });
}

export function fetchIssues(pagination = { startIndex: 0, stopIndex: -1 }) {
  const { startIndex, stopIndex } = pagination;
  return (dispatch, getState) => new Promise((resolve, reject) => {
    if (stopIndex > 0) {
      dispatch(setIssuesFetchState(true));
    }
    const jiraClient = getState().jira.client;
    const currentProjectKey = getState().projects.meta.get('selected');
    jiraClient.search.search({
      jql: `project = ${currentProjectKey}`,
      maxResults: stopIndex - startIndex + 1,
      startAt: startIndex,
      fields: ['summary', 'resolution', 'status', 'worklog'],
    }, (error, response) => {
      if (error) {
        dispatch({
          type: types.THROW_ERROR,
          error,
        });
        reject(error);
        return;
      }
      const issues = response.issues;
      const normalizedData = normalize(issues, [issueSchema]);
      dispatch({
        type: types.GET_ISSUES_COUNT,
        payload: response.total,
      });
      dispatch({
        type: types.ADD_ISSUES,
        payload: {
          map: normalizedData.entities.issues,
          ids: normalizedData.result,
        },
      });
      if (normalizedData.entities.worklogs) {
        dispatch({
          type: types.ADD_WORKLOGS,
          payload: {
            map: normalizedData.entities.worklogs,
            ids: Object.keys(normalizedData.entities.worklogs || {}),
          },
        });
      }
      if (stopIndex > 0) {
        dispatch(setIssuesFetchState(false));
      }
      resolve('done');
    });
  });
}

export function selectIssue(issueId) {
  return {
    type: types.SELECT_ISSUE,
    payload: issueId,
  };
}

export function selectRecent(recentId) {
  return {
    type: types.SELECT_RECENT,
    payload: recentId,
  };
}
