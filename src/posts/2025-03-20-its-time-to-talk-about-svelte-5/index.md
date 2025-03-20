---
title: It’s Time to Talk about Svelte 5
---

Since its initial development, I haven’t really talked about Svelte 5 much. To be honest, I wasn’t really excited of where it’s heading, but I wanted to give myself some time to accustom to it. And I think it’s time to talk about it, alas:

I don’t like Svelte 5.

<br/>
<br/>

Svelte had an appeal for small-medium codebases that preferred the simplicity, and it allowed for quick prototyping and moving fast. It excelled in an area that no other framework could beat. People had been [clamouring](https://www.reddit.com/r/sveltejs/comments/poqry9/mfw_i_have_to_create_a_new_reactive_variable_at/) for it.

There was a clear tradeoff with implicit reactivity and lack of universal reactivity, that the likes of React and Vue just scaled better for large codebases. Svelte 5 wanted a piece of that. It introduced a more verbose syntax, dropped its simplicity and what makes it unique in the first place, leaving its initial demographic behind. And I’m part of that demographic being left out.

<br/>
<br/>

I liked how any variable can be state, and you don’t really need to consciously think and plan for state. I liked how basic reactivity just boils down to `$:`. I liked how variables are one `export` away to be a prop. I liked how you can jam out code and Svelte will just try to figure it out.

I dislike how you have to always plan for `$state`. I dislike that there’s so many reactivity APIs: `$state.raw`, `$state.snapshot`, `$derived`, `$derived.by`, `$effect.tracking` , `$effect.root`, `$props` , `$bindable`, `$inspect`, and `untrack()`. I dislike that `$effect`, which should have worked like `$:`, is now discouraged. I don’t feel like `.svelte.js` is the right solution to the problem.

<br/>
<br/>

I don’t _like_ Svelte 5, but I don’t exactly hate it either. I can work with any UI frameworks in general and Svelte is now part of that among React, Vue, Solid, etc. I just don't have a go-to framework to push and root for anymore.

I wish that Svelte would’ve stayed true to its tradeoffs. I hope another framework comes along to fill in the void. I also wish it didn’t [vibe check](https://github.com/sveltejs/svelte/discussions/10085) those who had an opinion about it.

But I’ve come to accept how things are. I owe a lot to Svelte and the team, and I appreciate the work for pushing what they believed in. But it felt better for myself to speak out what I had in mind for a long while.

I hope one day I can be excited about web development again.
