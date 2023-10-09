import { useContext, useEffect } from "react";
import { TopicsListContext } from "../../contexts/topics/topics_list_context";
import { TopicListItem } from "../TopicListITem";
import { ListContainer } from "./style";
import { TopicsDispatcherContext } from "../../contexts/topics/topic_dispatcher_context";
import { ActionType } from "../../reducers/topic_reducer";
import { TopicService } from "../../providers/topic_service";


export function TopicList() {
  const topics = useContext(TopicsListContext)
  const topicsActionDispatcher = useContext(TopicsDispatcherContext)

  useEffect(
    () => {
      (async () => {
        const topics = await TopicService.getTopics();
        topicsActionDispatcher({ type: ActionType.Loaded, payload: { topics } });
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ListContainer style={{}}>
      {topics.map((topic) => (
        <TopicListItem
          key={topic.id}
          topic={topic}
        />
      ))}
    </ListContainer>
  )
}