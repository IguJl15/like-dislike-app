import { createContext } from "react"
import { Topic } from "../../interfaces/topic"


type TopicsListContextData = Array<Topic>

export const TopicsListContext = createContext<TopicsListContextData>([])