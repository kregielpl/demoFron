import Vue from "vue";
import axios from "axios";
import _ from "lodash";

export default {
    state: {
        lists: [],
        curatedLists: []
    },
    getters: {
        LISTS: state => {
            return state.lists;
        },
        CURATED_LISTS: (state, getters, rootState) => {
            if (!state.curatedLists.length && rootState.search.listSearch === "") {
                return state.lists;
            } else if (
                state.curatedLists.length &&
                rootState.search.listSearch !== ""
            ) {
                return state.curatedLists;
            } else if (rootState.search.listSearch === "") {
                return state.curatedLists;
            }
        },
        TASKS_COUNT: state => index => {
            if (index) {
                return state.lists.find(list => list.id === index).tasks.length;
            }
        },
        LIST_TITLE: state => index => {
            if (index) {
                return state.lists.find(list => list.id === index).title;
            }
        },
        TASKS: state => index => {
            if (index) {
                return state.lists.find(list => list.id === index).curatedTasks;
            }
        },
        TASK_TITLE: state => (listId, taskId) => {
            if (listId && taskId) {
                return state.lists
                    .find(list => list.id === listId)
                    .tasks.find(task => task.id === taskId).title;
            }
        },
        NOTES: state => (listId, taskId) => {
            return state.lists
                .find(list => list.id === listId)
                .tasks.find(task => task.id === taskId).notes;
        },
        LIST_BACKGROUND: state => index => {
            if (index) {
                return state.lists.find(list => list.id === index).backgroundPath;
            }
        }
    },
    mutations: {
        SET_LISTS: (state, payload) => {
            state.lists = payload;
        },
        ADD_LIST: (state, payload) => {
            state.lists.unshift(payload);
        },
        SET_TASKS: (state, { data, listId }) => {
            Vue.set(
                state.lists.find(list => list.id === listId),
                "curatedTasks",
                data
            );
            state.lists.find(list => list.id === listId).tasks = data;
        },
        ADD_TASK: (state, { data, listId }) => {
            state.lists.find(list => list.id === listId).tasks.push(data);
        },
        SET_TASK_STATUS: (state, { data, taskId, listId }) => {
            state.lists
                .find(list => list.id === listId)
                .tasks.find(task => task.id === taskId).isComplete = data;
        },
        SET_NOTES: (state, { data, listId, taskId }) => {
            state.lists
                .find(list => list.id === listId)
                .tasks.find(task => task.id === taskId).notes = data;
        },
        ADD_NOTE: (state, { data, listId, taskId }) => {
            state.lists
                .find(list => list.id === listId)
                .tasks.find(task => task.id === taskId)
                .notes.push(data);
        },

    },
    actions: {
        GET_LISTS: async ({ commit }) => {
            let { data } = await axios.get(`lists`);
            commit("SET_LISTS", data);
        },
        POST_LIST: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`lists`, payload)
                    .then(({ data, status }) => {
                        commit("ADD_LIST", data);
                        if (status === 200 || status === 201) {
                            resolve({ data, status });
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        GET_TASKS: async ({ commit, state }, payload) => {
            let { data } = await axios.get(`lists/${payload}/tasks`);
            commit("SET_TASKS", {
                data,
                listId: payload
            });

            let preferences = state.lists.find(list => list.id === payload)
                .preferences;
            commit("SORT_LIST_BY", { value: preferences.sortValue, listId: payload });
            commit("FILTER_LIST_BY", {
                filter_query: preferences.filterValue,
                listId: payload
            });
        },
        POST_TASK: async ({ commit }, { listId, taskTitle }) => {
            let { data } = await axios.post(`/lists/${listId}/tasks`, {
                title: taskTitle
            });
            commit("ADD_TASK", {
                data,
                listId
            });
        },
        TOGGLE_TASK: async ({ commit }, { taskId, listId }) => {
            let { data } = await axios.patch(`tasks/${taskId}/status`);
            commit("SET_TASK_STATUS", {
                data,
                taskId,
                listId
            });
        },
        GET_NOTES: async ({ commit }, { listId, taskId }) => {
            let { data } = await axios.get(`tasks/${taskId}/notes`);
            commit("SET_NOTES", {
                data,
                listId,
                taskId
            });
        },
        POST_NOTE: ({ commit }, { note, listId, taskId }) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`tasks/${taskId}/notes`, {
                        note
                    })
                    .then(({ data }) => {
                        commit("ADD_NOTE", {
                            data,
                            listId,
                            taskId
                        });
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },





    }
};