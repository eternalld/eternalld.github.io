# Loop the three research tags

Date: 2026-11-24
Branch: `cursor/tag-loop-6ae4`

The three labels stay Agent RSI, Agent & Generative Model Post-Training, and Controllable Generation. Their existing entrance motion loops. Nothing else moves on a loop.

The motion is `tag-float`: 3.2s, `ease-in-out`, from `translateY(0)` to `translateY(-3px)` at 40% and back to `translateY(0)`. The second tag starts 0.15s later and the third 0.3s later. The welcome line and the title keep the one-time `intro-fade` of 0.8s.

`prefers-reduced-motion: reduce` still removes the animation and the transform. Pointing at the tags, or focusing inside them, pauses the loop so the labels can be read. No new control is added.
