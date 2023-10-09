import { PropsWithChildren, useReducer } from 'react';
import { topicStateReducer } from '../../reducers/topic_reducer';
import { TopicsDispatcherContext } from './topic_dispatcher_context';
import { TopicsListContext } from './topics_list_context';

export default function TopicsContextProviders({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(topicStateReducer, { topics: [] });

  return (
    <TopicsListContext.Provider value={state.topics}>
      <TopicsDispatcherContext.Provider value={dispatch}>
        {children}
      </ TopicsDispatcherContext.Provider>
    </TopicsListContext.Provider>
  )
}