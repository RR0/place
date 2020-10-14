import {Grammar} from "./Translator";
import {Messages} from "./Messages";

export interface Language {
  messages: Messages,
  grammar: Grammar,
}
