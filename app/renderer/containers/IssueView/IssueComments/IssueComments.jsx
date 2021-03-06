// @flow
import React, {
  Component,
} from 'react';
import moment from 'moment';
import {
  connect,
} from 'react-redux';

import type {
  Id,
  User,
  IssueComment,
  Dispatch,
} from 'types';
import type {
  Connector,
} from 'react-redux';

import Spinner from '@atlaskit/spinner';
import Button from '@atlaskit/button';
import {
  FieldTextAreaStateless,
} from '@atlaskit/field-text-area';

import {
  getUserData,
  getUiState,
  getResourceMappedList,
} from 'selectors';
import {
  issuesActions,
} from 'actions';
import {
  Flex,
  IssueCommentPlaceholder,
} from 'components';

import {
  getStatus as getResourceStatus,
} from 'redux-resource';

import DataRenderer from '../DataRenderer';

import * as S from './styled';


type Props = {
  comments: Array<IssueComment>,
  commentsFetching: boolean,
  adding: boolean,
  self: User,
  selectedIssueId: Id,
  dispatch: Dispatch,
};

type State = {
  comment: string,
};

class IssueComments extends Component<Props, State> {
  state = {
    comment: '',
  };

  render() {
    const {
      comments,
      commentsFetching,
      adding,
      self,
      selectedIssueId,
      dispatch,
    }: Props = this.props;
    return (
      <S.Activity>
        <Flex column>
          <Flex column>
            {commentsFetching
              && Array.from(Array(10).keys()).map(
                i => <IssueCommentPlaceholder key={i} />,
              )
            }
            {!commentsFetching && comments.length === 0
              && (
              <Flex row>
                There are no comments yet on this issue.
              </Flex>
              )
            }
            {!commentsFetching && comments.map(comment => (
              <S.Commentd key={comment.id}>
                <Flex row alignCenter spaceBetween style={{ marginBottom: 5 }}>
                  <Flex row alignCenter>
                    <S.CommentAvatar src={comment.author.avatarUrls['48x48']} alt="" />
                    <Flex row>
                      <S.CommentAuthor>
                        {comment.author.displayName}
                      </S.CommentAuthor>
                      <S.CommentDate>
                        {moment(comment.updated).format('DD, MMMM YYYY')}
                      </S.CommentDate>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex column>
                  <S.CommentBody>
                    <DataRenderer
                      html={comment.renderedBody ? comment.renderedBody : null}
                      source={comment.body}
                    />
                  </S.CommentBody>
                </Flex>
              </S.Commentd>
            ))}
          </Flex>
          {!commentsFetching
            && (
            <S.CommentInput>
              <Flex row alignCenter style={{ marginBottom: 5 }}>
                <S.CommentAvatar src={self.avatarUrls['48x48']} alt="" />
                <S.YourComment>
                  Comment
                </S.YourComment>
              </Flex>
              <S.CommentInputContainer>
                <FieldTextAreaStateless
                  shouldFitContainer
                  label=""
                  type="text"
                  placeholder="Type your comment here"
                  id="comment-input"
                  value={this.state.comment}
                  onChange={ev => this.setState({ comment: ev.target.value })}
                />
                <S.Actions>
                  <Button
                    onClick={() => {
                      dispatch(issuesActions.commentRequest(
                        this.state.comment,
                        selectedIssueId,
                      ));
                      this.setState({ comment: '' });
                    }}
                    iconAfter={adding ? <Spinner /> : null}
                    isDisabled={adding}
                  >
                    Add
                  </Button>
                </S.Actions>
              </S.CommentInputContainer>
            </S.CommentInput>
            )
          }
        </Flex>
      </S.Activity>
    );
  }
}

function mapStateToProps(state) {
  const selectedIssueId = getUiState('selectedIssueId')(state);
  return {
    comments: getResourceMappedList(
      'issuesComments',
      `issue_${selectedIssueId}`,
    )(state),
    commentsFetching: getResourceStatus(
      state,
      `issuesComments.requests.issue_${selectedIssueId}.status`,
    ).pending,
    selectedIssueId,
    adding: getUiState('commentAdding')(state),
    self: getUserData(state),
  };
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
);

export default connector(IssueComments);
