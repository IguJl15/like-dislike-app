import React, { createContext } from "react"
import { Action } from "../../reducers/topic_reducer"


type TopicsDispatcherContextData = React.Dispatch<Action>

export const TopicsDispatcherContext = createContext<TopicsDispatcherContextData>((a: Action) => { a })