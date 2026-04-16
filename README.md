# Cuemath Social Media Studio

**Live URL:** https://cuemath-social-studio-nine.vercel.app

**GitHub Repo:** https://github.com/YOUR_USERNAME/cuemath-social-studio

**Built With:** Next.js 14, Google Gemini 2.5 Flash API, Tailwind CSS, Vercel

---

## What I Built and Which Problem I Picked

I picked the **Social Media Studio** problem statement.

### The Problem

Cuemath's marketing and content teams create social media posts, carousels, and stories for parents of children aged 6-16. The current process is slow and painful. Someone has to come up with the content idea, write the copy for each slide, make sure the tone is right for parents, keep the brand colors and fonts consistent, design each slide, and then export it — all before a single post goes live. A 5-slide carousel could easily take 2-3 hours from idea to ready-to-post file.

The bigger problem is consistency. When different people create content, the tone shifts, the colors drift, and the storytelling structure falls apart. One carousel might have a strong hook and weak ending. Another might have the right structure but the wrong tone for a parent audience.

### What I Built

I built a web application called **Cuemath Social Media Studio** where a user types a rough idea in plain English and gets a complete, polished, ready-to-post social media creative in under 10 seconds.

The user types something like:

> "why kids forget what they learn — explain the forgetting curve — end with how spaced repetition fixes it"

And the app produces:

- A fully designed 5-slide carousel with proper storytelling structure
- Slide 1 is always a scroll-stopping hook
- Middle slides build the story one idea at a time
- The last slide always has a clear takeaway and call-to-action
- Every slide has a headline, supporting text, icon, and gradient visual
- A suggested Instagram caption with emojis
- 5 relevant hashtags including #Cuemath
- All content written in Cuemath's warm, educational, parent-focused tone

The studio supports three format types:
- **Carousel** (4:5 aspect ratio) — 3, 5, or 7 slides
- **Instagram Post** (1:1 square) — single slide
- **Instagram Story** (9:16 vertical) — single slide

After generating, the user can:
- Navigate through slides with arrows or click the filmstrip at the bottom
- Enter Edit Mode and click directly on any headline or subtext to edit it inline
- Use the Edit Panel to update copy, regenerate a single slide, change brand colors, copy the caption
- Export the entire carousel as a PDF or download each slide as an individual PNG

---

## Key Decisions and Tradeoffs

### Decision 1: Dynamic Gradient Visuals Instead of AI Image Generation

The most obvious approach for a social media studio would be to use DALL-E 3 or Stability AI to generate a unique illustration for each slide. I deliberately chose not to do this.

**Why I chose gradients instead:**

- **Speed** — AI image generation takes 5-15 seconds per image. A 5-slide carousel would take over a minute just for images. My gradient system is instant.
- **Cost** — DALL-E 3 costs money per image. For a free-tier demo this would have been a hard blocker. My approach costs nothing.
- **Consistency** — AI-generated images are unpredictable. They might have text in them, wrong colors, or styles that clash between slides. My 6 gradient styles and 4 layout variations are always brand-consistent.
- **Reliability** — External image APIs can fail, rate-limit, or return unusable results. My visual system never fails.

The tradeoff is that slides do not have unique illustrated content specific to the topic. But in practice, well-designed gradient slides with strong typography look more professional than mediocre AI illustrations, which is exactly what free-tier image generation tends to produce.

I built 6 gradient styles:
- gradient1: Orange to Purple (primary Cuemath brand)
- gradient2: Purple to Blue
- gradient3: Orange to Pink
- gradient4: Dark Navy (for contrast slides)
- gradient5: Blue to Purple
- gradient6: Yellow Orange (warm accent)

And 4 layout variations:
- **center** — icon centered, headline centered below, best for hook slides
- **iconTop** — icon top-left, headline below, best for content slides
- **split** — text on left, icon on right, best for stat or fact slides
- **bigText** — very large headline fills the slide, best for takeaway slides

Gemini assigns the most appropriate gradient and layout to each slide based on its content type and position in the story.

### Decision 2: Intelligent Fallback Content System

Every live demo has a risk — what if the API is down, rate-limited, or the key expires at the worst moment? I treated this as a non-negotiable requirement.

I built a complete fallback system that activates silently whenever Gemini is unavailable. It is not just a generic error slide. It is an 8-topic keyword matching system with fully pre-written, high-quality slide content for the most common Cuemath content themes:

- Forgetting curve and memory retention — keywords: forget, memory, remember, recall, retention
- Math anxiety in children — keywords: anxiety, fear, scared, hate, stress, worry
- Keeping kids engaged — keywords: interest, bored, motivation, fun, curious, enjoy
- Building practice habits — keywords: practice, habit, routine, daily, consistent, schedule
- Exam preparation — keywords: exam, test, score, grade, marks, result, performance
- Growth mindset — keywords: growth, mindset, confidence, believe, potential, capable
- Learning methods — keywords: teach, method, learn, approach, technique, style
- Spaced repetition — keywords: spaced, repetition, review, interval, revision

When the user types an idea, the fallback checks if any keyword from each topic appears in the idea string. If there is a match, it uses that topic's pre-written slides. If there is no match at all, it generates generic but professional Cuemath slides dynamically using words from the user's own idea.

The user never sees an error message. The app always produces slides. This was critical for demo confidence.

### Decision 3: Server-Side API Key Security

The Gemini API key lives exclusively in a Next.js server-side API route at `/api/generate`. It reads from `process.env.GEMINI_API_KEY` which is set in `.env.local` locally and in Vercel Environment Variables in production.

No API key is ever:
- In any React component
- In any client-side file
- Sent to the browser
- Visible in the GitHub repository

All AI calls from the frontend go to `/api/generate` which is a server-side POST handler. The browser never knows what AI service is being used or what key is being used to call it.

### Decision 4: Google Gemini Free Tier Over OpenAI

I chose Gemini 2.5 Flash for three reasons:
- **Zero cost** — the free tier is generous enough for all demo needs
- **No credit card required** — anyone can get an API key instantly at aistudio.google.com
- **JSON output quality** — Gemini is excellent at following structured JSON output instructions for content generation tasks like this one

The tradeoff is that Gemini's free tier has rate limits and sometimes returns slightly malformed JSON (which I solved — see challenges below). OpenAI's GPT-4 would be more reliable but costs money and requires a credit card.

### Decision 5: Inline Styles Over Tailwind for Critical Visual Components

Initially I built all component styling with Tailwind CSS classes. This worked perfectly in development but broke in production — Tailwind's build step removes any class it cannot detect statically in the source code. Dynamic class names like `bg-gradient-to-br from-orange-500` built at runtime were being purged.

I solved this by switching all critical visual styling in SlideCard and CarouselPreview to inline styles with hardcoded JavaScript objects. Less elegant than Tailwind utilities but 100% reliable in production. Non-critical styling like spacing and layout still uses Tailwind.

---

## What I Would Improve or Add With More Time

**1. Direct Instagram API Publishing**
Connect to the Instagram Graph API so users can publish carousels directly from the studio without downloading and re-uploading. This would make it a true end-to-end workflow tool — from idea to live post in one place.

**2. Template Library**
A gallery of pre-built carousel themes for the most common Cuemath content categories. Users could start from a template and regenerate the copy for their specific angle rather than starting from scratch every time. This would dramatically speed up the workflow for recurring content types.

**3. Custom Font and Logo Upload**
Right now the studio uses Inter as the font and a text-based Cuemath logo. With more time I would let the brand team upload their exact font files and SVG logo so every export is pixel-perfect to brand guidelines without any manual adjustment after downloading.

**4. Slide Reordering**
A drag-and-drop interface to reorder slides in the carousel. Sometimes the AI gets the story structure slightly wrong and the user wants to swap slide 2 and slide 3. Currently they would have to regenerate.

**5. Version History**
Save multiple versions of a carousel so users can go back to a previous generation if they prefer an earlier version of the content. LocalStorage handles the last session but does not maintain history.

**6. More Platform Formats**
LinkedIn document carousels, Twitter/X thread cards, YouTube thumbnail, WhatsApp status. The same idea input and generation engine could produce different format outputs with just different aspect ratio and copy length parameters.

**7. Team Collaboration**
A shareable link that lets team members leave comments on slides before the carousel is published. Basic review workflow without leaving the tool.

**8. Analytics Integration**
Track which carousel styles, gradient combinations, and content topics perform best on Instagram. Feed that data back into the generation prompt to improve content quality over time.

---

## Interesting Challenges and How I Solved Them

### Challenge 1: Gemini Returning Malformed JSON

**The problem in detail:**
My API route asks Gemini to return a structured JSON object with a slides array. Gemini is very good at this but not perfect. The issues I encountered were:

- Returning the JSON wrapped in markdown code blocks like \`\`\`json ... \`\`\`
- Adding trailing commas after the last item in arrays or objects
- Using smart/curly quotes instead of standard double quotes
- Including explanatory text before or after the JSON object
- Adding newline characters inside string values that broke the JSON structure
- Using apostrophes in contractions like "child's" or "don't" which conflicted with JSON string delimiters

Any one of these would cause `JSON.parse()` to throw an error and the entire generation would fail.

**How I solved it:**
I built a 5-step sanitization pipeline that runs on every Gemini response before parsing:

1. Remove markdown code blocks — strip \`\`\`json and \`\`\` using regex
2. Extract the JSON object — find the first `{` and last `}` in the string and take only that substring, discarding any text before or after
3. Remove trailing commas — regex replace `,` followed by `}` or `]` with just `}` or `]`
4. Fix smart quotes — replace Unicode left and right single and double quote characters with standard ASCII equivalents
5. Remove control characters — strip any character with ASCII code below 32 except spaces, replacing them with a space

I also updated the prompt to be very explicit: "You must respond with ONLY a valid JSON object. No markdown. No code blocks. No backticks. No explanation. Start with { and end with }. Use only double quotes. No trailing commas." This reduced the frequency of problems significantly but the cleaning pipeline means the app handles it gracefully even when Gemini does not follow instructions perfectly.

---

### Challenge 2: PDF Export Capturing Tiny Thumbnail Slides

**The problem in detail:**
The carousel preview shows a large main slide in the center and a filmstrip row of small thumbnail previews at the bottom. I assigned `id="slide-{index}"` to SlideCard components so html2canvas could find and capture them by ID.

The bug was that both the main preview slide AND the filmstrip thumbnail for the same index had the same ID. When html2canvas searched for `id="slide-1"`, it was finding the filmstrip thumbnail first because it appeared earlier in the DOM. The thumbnail was scaled down to about 80px wide using CSS transforms, so the captured image was tiny and distorted when scaled up to PDF page size.

Slide 1 looked perfect because the main preview always showed slide 1 on load — it was positioned first in the DOM. Slides 2-5 were wrong because their main preview versions were lower in the DOM than their thumbnail versions.

**How I solved it:**
I changed the filmstrip thumbnail SlideCards to always receive `slideIndex={-1}` as their prop, giving them `id="slide--1"` which the export function never looks for. Only the main preview SlideCard receives the real `slideIndex` prop.

I also updated the export flow to navigate to each slide programmatically by calling `onSlideChange(index)`, then wait 1000ms for React to re-render the main preview with that slide's content, then capture `id="slide-{index}"` which is now guaranteed to be the full-size main preview version.

---

### Challenge 3: Multiple PNG Downloads Blocked by Browser

**The problem in detail:**
When the user clicks "Download All as PNGs" the app needs to trigger 5 separate file downloads. My first implementation looped through all slides and called `link.click()` for each one in sequence. The browser allowed the first download and silently blocked all the others. This is a browser security feature — multiple automatic downloads are treated as potentially malicious behaviour.

**How I solved it:**
I switched from `canvas.toDataURL()` to `canvas.toBlob()` combined with `URL.createObjectURL()`. Instead of triggering all downloads at once, I made the loop fully async with `await` at each step. Between each download I added a 1500ms delay using `await new Promise(r => setTimeout(r, 1500))`. I also append a new `<a>` element to `document.body`, click it, then immediately remove it from the DOM for each individual file. This pattern makes each download appear as a distinct, separately-initiated action to the browser's security system rather than a scripted multi-download attempt.

---

### Challenge 4: Fallback Showing Generic Unrelated Content

**The problem in detail:**
My first fallback implementation had a generic default template that always showed "Mathematics Opens Doors" regardless of what the user typed. When Gemini was failing (during the model name debugging phase), every single generation showed completely irrelevant content. A user typing "kids forget things fast" was getting slides about generic math benefits.

**How I solved it:**
I completely rewrote the fallback system with an 8-topic keyword matching approach. The `generateFallbackContent` function takes the user's idea string, converts it to lowercase, and checks if any keyword from each of the 8 topic templates appears anywhere in the string using `ideaLower.includes(keyword)`.

Each topic template has 10-15 carefully chosen keywords covering the main ways a user might describe that topic. "Forget", "memory", "remember", "memorize", "retention", "recall", "forgetting" all map to the forgetting curve topic. If a match is found, that topic's pre-written slides are used.

For ideas that do not match any topic, instead of a generic template I now generate slides dynamically using words extracted from the user's own idea — the first few words become the hook headline and the content builds around the idea string itself. This means even the fallback always feels relevant to what the user typed.

---

## Security Checklist

- API key stored in `.env.local` — never committed to GitHub
- `.env.local` listed in `.gitignore`
- All Gemini API calls go through server-side Next.js API route only
- No API keys or secrets in any React component or client-side file
- Environment variable configured in Vercel dashboard for production
- No sensitive data stored in localStorage (only slide content, no keys)