import { Topic } from './../interfaces/topic';

export interface TopicState {
    topics: Topic[];
}

export enum ActionType {
    Loaded,
    Added,
    Changed,
    Deleted,
}

type TopicAdded = { type: ActionType.Added; payload: { topic: Topic } };
type TopicChanged = { type: ActionType.Changed; payload: { topic: Topic } };
type TopicDeleted = { type: ActionType.Deleted; payload: { id: string } };
type TopicsLoaded = { type: ActionType.Loaded; payload: { topics: Topic[] } };

export type Action = TopicAdded | TopicChanged | TopicDeleted | TopicsLoaded;

const reducer = (state: TopicState, action: Action): TopicState => {
    switch (action.type) {
        case ActionType.Loaded: {
            return { topics: action.payload.topics };
        }
        case ActionType.Added: {
            return { topics: [action.payload.topic, ...state.topics] };
        }
        case ActionType.Changed: {
            const changedTopic = action.payload.topic;
            const topics = state.topics.filter((topic) => topic.id === changedTopic.id ? changedTopic : topic);
            return { topics };
        }
        case ActionType.Deleted: {
            return {
                ...state,
                topics: state.topics.filter((topic) => topic.id !== action.payload.id),
            };
        }
        default:
            console.debug(`Unhandled action type: ${action}`);
            return state;
    }
}


export { reducer as topicStateReducer };
