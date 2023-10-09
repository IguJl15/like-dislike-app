import { useContext } from "react";
import lock from "../../assets/icons/lock.svg";
import unlock from "../../assets/icons/unlock.svg";
import { TopicsDispatcherContext } from "../../contexts/topics/topic_dispatcher_context";
import { Topic } from "../../interfaces/topic";
import { TopicService } from "../../providers/topic_service";
import { ActionType } from "../../reducers/topic_reducer";
import { Voting } from "../Voting";
import { AuthorLabel, ChangeActiveButton, DateLabel, Description, Row, Tag, Tags, TopicItem } from "./style";

interface TopicListItemProps {
  topic: Topic;
}

export function TopicListItem({ topic }: TopicListItemProps) {

  const topicsActionDispatcher = useContext(TopicsDispatcherContext)

  async function toggleActiveTopic() {
    const originalTopic: Topic = { ...topic }
    topic.active = !topic.active;

    dispatchChangedEvent(topic);

    TopicService.updateTopic(topic)
      .then(null, () => { // on error
        dispatchChangedEvent(originalTopic)
      })

  }


  function dispatchChangedEvent(topic: Topic) {
    topicsActionDispatcher({ type: ActionType.Changed, payload: { topic } })
  }

  async function likeTopic() {
    const originalTopic: Topic = { ...topic }

    topic.likes += 1;

    dispatchChangedEvent(topic);

    TopicService.updateTopic(topic)
      .then(null, /* onError: */() => {
        dispatchChangedEvent(originalTopic);
      });
  }

  async function dislikeTopic() {
    const originalTopic: Topic = { ...topic }

    topic.dislikes += 1;

    dispatchChangedEvent(topic);

    TopicService.updateTopic(topic)
      .then(null, /* onError: */() => {
        dispatchChangedEvent(originalTopic);
      });
  }


  const onHandleChangeActive = () => {
    const response = prompt("Password")
    if (response === "123456") {
      confirm(`Are you sure you want to ${topic.active ? "lock" : "unlock"} this topic?`);
      toggleActiveTopic();
    } else {
      alert("Wrong password!");
    }
  }

  return (
    <TopicItem>
      <Row>
        <AuthorLabel>@{topic.author.username}</AuthorLabel>
        <ChangeActiveButton onClick={onHandleChangeActive} style={{ backgroundColor: topic.active ? "#242D28" : "#302629" }}>
          <img src={topic.active ? unlock : lock} alt="lock/unlock button" />
        </ChangeActiveButton>
      </Row>
      <Description>{topic.description}</Description>
      <Tags>
        {topic.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>

      <Row>
        <DateLabel>{new Date(topic.createdAt).toISOString().split("T")[0].split("-").reverse().join("/")}</DateLabel>
        <Voting topic={topic} likeTopic={likeTopic} dislikeTopic={dislikeTopic} />
      </Row>
    </TopicItem>
  );
}
