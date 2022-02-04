// based on https://github.com/Jam3/voice-activity-detection/blob/master/test/test.js

import "./styles.css";

import xs from "xstream";
import { run } from "@cycle/run";
import { div, makeDOMDriver } from "@cycle/dom";

import makeVoiceActivityDetectionDriver, {
  adapter
} from "./makeVoiceActivityDetectionDriver";

function main(sources) {
  sources.VAD = adapter(sources.VAD);

  const vdom$ = xs
    .combine(sources.VAD.events("state"), sources.VAD.events("level"))
    .map(([st, lv]) =>
      div([
        div(`Voice state: ${st}`),
        div(`Current voice activity value: ${lv}`)
      ])
    );
  return {
    DOM: vdom$
  };
}

run(main, {
  DOM: makeDOMDriver("#app"),
  VAD: makeVoiceActivityDetectionDriver({
    useNoiseCapture: false,
    activityCounterThresh: 10,
    activityCounterMax: 30
  })
});
