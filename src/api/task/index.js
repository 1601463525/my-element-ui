import { getJSON,postJSON } from '@/utils/ajax';


// 获取确认电表信息列表
export function getTaskConfirmMeterData(params) {
    return getJSON('/api/task/confirm/getTaskConfirmMeterData', params);
}
// 获取确认固定比例列表
export function getTaskConfirmPropData(params) {
    return getJSON('/api/task/confirm/getTaskConfirmPropData', params);
}
// 获取确认结算信息列表
export function getTaskConfirmSettiData(params) {
    return getJSON('/api/task/confirm/getTaskConfirmSettiData', params);
}
// 获取确认电表信息列表
export function batchConfirm(params) {
    return postJSON('/api/task/confirm/batchConfirm', params);
}
// 获取确认电表信息列表
export function batchConfirmProp(params) {
    return postJSON('/api/task/confirm/batchConfirmProp', params);
}
// 获取确认电表信息列表
export function batchConfirmSetti(params) {
    return postJSON('/api/task/confirm/batchConfirmSetti', params);
}
// 获取确认电表信息列表
export function getTaskConfirmDetail(params) {
    return getJSON('/api/task/confirm/getTaskConfirmDetail', params);
}
// 获取确认电表信息列表
export function getTaskConfirmPropDetail(params) {
    return getJSON('/api/task/confirm/getTaskConfirmPropDetail', params);
}
// 获取确认电表信息列表
export function getTaskConfirmSettiDetail(params) {
    return getJSON('/api/task/confirm/getTaskConfirmSettiDetail', params);
}
// 获取确认电表信息列表
export function submitConfirmSettiDetail(params) {
    return postJSON('/api/task/confirm/submitSetti', params);
}


// 获取确认电表信息列表
export function getTaskVoteMeterData(params) {
    return getJSON('/api/task/vote/getTaskVoteMeterData', params);
}
// 获取确认固定比例列表
export function getTaskVotePropData(params) {
    return getJSON('/api/task/vote/getTaskVotePropData', params);
}
// 获取确认结算信息列表
export function getTaskVoteSettiData(params) {
    return getJSON('/api/task/vote/getTaskVoteSettiData', params);
}
// 获取确认电表信息列表
export function batchVote(params) {
    return postJSON('/api/task/vote/batchVote', params);
}
// 获取确认电表信息列表
export function batchVoteProp(params) {
    return postJSON('/api/task/vote/batchVoteProp', params);
}
// 获取确认电表信息列表
export function batchVoteSetti(params) {
    return postJSON('/api/task/vote/batchVoteSetti', params);
}
// 获取确认电表信息列表
export function getTaskVoteDetail(params) {
    return getJSON('/api/task/vote/getTaskVoteDetail', params);
}
// 获取确认电表信息列表
export function getTaskVotePropDetail(params) {
    return getJSON('/api/task/vote/getTaskVotePropDetail', params);
}
// 获取确认电表信息列表
export function getTaskVoteSettiDetail(params) {
    return getJSON('/api/task/vote/getTaskVoteSettiDetail', params);
}
// 获取确认电表信息列表
export function submitVoteSettiDetail(params) {
    return postJSON('/api/task/vote/submitVoteSettiDetail', params);
}
// 判断电表是否上电
export function existInConsResult(params) {
    return getJSON('/api/cons/existInConsResult', params);
}
export default {
    getTaskConfirmMeterData,
    batchConfirm,
    getTaskConfirmDetail,
};
