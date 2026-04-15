import { LAYOUT_STYLES, GRADIENT_STYLES } from "./constants";

interface Slide {
  slideNumber: number;
  headline: string;
  subtext: string;
  callToAction?: string;
  layoutStyle: string;
  gradientStyle: string;
  icon: string;
}

interface FallbackContentResult {
  slides: Slide[];
  hashtags: string[];
  suggestedCaption: string;
  title: string;
}

// Helper function to randomly select from an array
function randomSelect<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random layout style id
function getRandomLayout(): string {
  return randomSelect(LAYOUT_STYLES).id;
}

// Helper function to get random gradient style id
function getRandomGradient(): string {
  return randomSelect(GRADIENT_STYLES).id;
}

// Topic templates with keywords and slide content
const topicTemplates = [
  {
    keywords: [
      "forgetting",
      "spaced",
      "repetition",
      "recall",
      "memory",
      "retention",
    ],
    title: "The Forgetting Curve & Spaced Repetition",
    hashtags: ["#SpacedRepetition", "#LearningScience", "#MathSuccess"],
    suggestedCaption:
      "Did you know? Regular practice at increasing intervals strengthens memory! Learn how spaced repetition helps your child master math concepts. 📚✨",
    slides: [
      {
        slideNumber: 1,
        headline: "Your Child's Brain Forgets",
        subtext:
          "Without practice, we forget 50% of new information within days. But there's hope!",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Brain",
      },
      {
        slideNumber: 2,
        headline: "Spaced Out Success",
        subtext:
          "Reviewing material at increasing intervals creates stronger memories and deeper understanding.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "TrendingUp",
      },
      {
        slideNumber: 3,
        headline: "The Pattern That Works",
        subtext:
          "Review after 1 day, 3 days, 1 week. This spacing boosts long-term retention.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Calendar",
      },
      {
        slideNumber: 4,
        headline: "Make It a Habit",
        subtext:
          "Short daily math sessions beat cramming every time. Consistency is the key.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Zap",
      },
      {
        slideNumber: 5,
        headline: "Start This Week",
        subtext:
          "Practice a concept daily, then space out reviews. Watch your child's confidence soar!",
        callToAction: "Learn more about effective study techniques today.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "CheckCircle",
      },
    ],
  },
  {
    keywords: ["anxiety", "scared", "nervous", "fear", "hate math", "struggle"],
    title: "Overcoming Math Anxiety in Children",
    hashtags: ["#MathAnxiety", "#ChildConfidence", "#MathLove"],
    suggestedCaption:
      "Math anxiety is real, but it's conquerable! Discover proven strategies to help your child feel confident and excited about learning math. 💪",
    slides: [
      {
        slideNumber: 1,
        headline: "Math Anxiety Is Common",
        subtext:
          "Many children feel nervous about math. The good news? It's completely manageable.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Heart",
      },
      {
        slideNumber: 2,
        headline: "Identify the Fear",
        subtext:
          "Is it fear of failure, time pressure, or not understanding? Understanding the root helps.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Search",
      },
      {
        slideNumber: 3,
        headline: "Start with Success",
        subtext:
          "Begin with easy problems. Small wins build confidence and reduce anxiety naturally.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Award",
      },
      {
        slideNumber: 4,
        headline: "Celebrate Progress",
        subtext:
          "Praise effort, not just answers. Focus on growth and improvement over perfection.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Smile",
      },
      {
        slideNumber: 5,
        headline: "Create Safe Space",
        subtext:
          "Make math fun and low-pressure. Patient, supportive learning transforms anxiety into confidence.",
        callToAction: "Start building math confidence in your child today.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Lightbulb",
      },
    ],
  },
  {
    keywords: ["growth", "mindset", "talent", "potential", "effort", "fixed"],
    title: "Growth Mindset & Math Success",
    hashtags: ["#GrowthMindset", "#MathPotential", "#BelieveInYourChild"],
    suggestedCaption:
      "Math ability isn't fixed! A growth mindset transforms how children approach challenges. Unlock your child's true potential. 🌱",
    slides: [
      {
        slideNumber: 1,
        headline: "Fixed vs. Growth Mindset",
        subtext:
          "Fixed: 'I'm not a math person.' Growth: 'I'm not good at it yet, but I can learn.'",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "RefreshCw",
      },
      {
        slideNumber: 2,
        headline: "Struggle Is Growth",
        subtext:
          "When math feels hard, celebrate it! That struggle means your child's brain is learning.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Zap",
      },
      {
        slideNumber: 3,
        headline: "Effort Creates Ability",
        subtext:
          "Every challenging problem solved builds neural connections and mathematical thinking skills.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Muscle",
      },
      {
        slideNumber: 4,
        headline: "Reframe Mistakes",
        subtext:
          "Mistakes are learning opportunities, not failures. They show us where improvement happens.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "AlertCircle",
      },
      {
        slideNumber: 5,
        headline: "You Can Learn Anything",
        subtext:
          "Tell your child: 'Your brain grows with practice.' Watch their confidence and abilities soar.",
        callToAction: "Foster a growth mindset in your child this week.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Star",
      },
    ],
  },
  {
    keywords: ["exam", "test", "preparation", "exams", "score", "boards"],
    title: "Exam Preparation Tips for Math Success",
    hashtags: ["#ExamReady", "#MathPrep", "#StudentSuccess"],
    suggestedCaption:
      "Exam season? Help your child ace math with proven preparation strategies. Smart studying beats last-minute cramming! 📝",
    slides: [
      {
        slideNumber: 1,
        headline: "Plan Ahead",
        subtext:
          "Start preparation 4-6 weeks before exams. Spread learning across time for better retention.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Calendar",
      },
      {
        slideNumber: 2,
        headline: "Topic by Topic",
        subtext:
          "Master one concept fully before moving to the next. Foundations matter for building confidence.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Layers",
      },
      {
        slideNumber: 3,
        headline: "Practice Problems",
        subtext:
          "Solve different types of problems repeatedly. Familiarity reduces exam anxiety significantly.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Code",
      },
      {
        slideNumber: 4,
        headline: "Time Management",
        subtext:
          "Practice solving problems within time limits. Speed and accuracy develop together with practice.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Clock",
      },
      {
        slideNumber: 5,
        headline: "Day Before Tips",
        subtext:
          "Light review, good sleep, and a calm mind. Trust your preparation and rest assured.",
        callToAction: "Download our complete exam prep checklist for parents.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "CheckCircle",
      },
    ],
  },
  {
    keywords: ["practice", "regular", "daily", "homework", "consistent", "habit"],
    title: "Why Regular Practice Transforms Math Skills",
    hashtags: ["#MathPractice", "#DailyLearning", "#SkillBuilding"],
    suggestedCaption:
      "Math mastery comes from consistent practice! Just 15 minutes daily creates incredible progress over time. 📈",
    slides: [
      {
        slideNumber: 1,
        headline: "Consistency Beats Intensity",
        subtext:
          "Daily 15-minute sessions outperform sporadic long sessions. Rhythm builds skill permanently.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Clock",
      },
      {
        slideNumber: 2,
        headline: "Math Is a Skill",
        subtext:
          "Like playing an instrument, math improves through regular practice. Your child's brain adapts.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Music",
      },
      {
        slideNumber: 3,
        headline: "Build Automaticity",
        subtext:
          "Repeated practice makes calculations automatic, freeing mental space for complex problem-solving.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Zap",
      },
      {
        slideNumber: 4,
        headline: "Show Progress Visually",
        subtext:
          "Track improvements to motivate your child. Seeing progress builds intrinsic motivation naturally.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "TrendingUp",
      },
      {
        slideNumber: 5,
        headline: "Start Your Routine Today",
        subtext:
          "Commit to daily math practice. In weeks, you'll see remarkable improvement and increased confidence.",
        callToAction: "Create a personalized practice routine for your child.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Rocket",
      },
    ],
  },
  {
    keywords: [
      "learning",
      "how",
      "brain",
      "understand",
      "concept",
      "develop",
      "cognitive",
    ],
    title: "How Children Learn Math Concepts",
    hashtags: ["#LearningScience", "#MathCognition", "#ChildDevelopment"],
    suggestedCaption:
      "Understanding how children's brains learn math helps you support their education better. Science-backed insights for parents! 🧠",
    slides: [
      {
        slideNumber: 1,
        headline: "From Concrete to Abstract",
        subtext:
          "Children learn by manipulating objects, then visualizing, then working with symbols and numbers.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Layers",
      },
      {
        slideNumber: 2,
        headline: "Multiple Representations",
        subtext:
          "Numbers, drawings, models, and real-world examples help children understand concepts completely.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Eye",
      },
      {
        slideNumber: 3,
        headline: "Building on Prior Knowledge",
        subtext:
          "New concepts connect to what children already know. Building connections strengthens understanding.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Link",
      },
      {
        slideNumber: 4,
        headline: "Active Engagement Matters",
        subtext:
          "Discussing, explaining, and reasoning boost comprehension. Passive learning doesn't stick well.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "MessageCircle",
      },
      {
        slideNumber: 5,
        headline: "Support Their Learning Path",
        subtext:
          "Every child learns differently and at their own pace. Patient guidance unlocks their potential.",
        callToAction: "Discover age-appropriate learning strategies for your child.",
        layoutStyle: getRandomLayout(),
        gradientStyle: getRandomGradient(),
        icon: "Heart",
      },
    ],
  },
];

// Default template for unmatched ideas
const defaultTemplate = {
  title: "Master Math with Cuemath",
  hashtags: ["#MathSkills", "#LearningJourney", "#ParentSupport"],
  suggestedCaption:
    "Help your child become confident in math. With the right approach and consistent practice, every child can succeed! 🌟",
  slides: [
    {
      slideNumber: 1,
      headline: "Mathematics Opens Doors",
      subtext:
        "Strong math skills boost academic success and confidence in all areas of learning.",
      layoutStyle: getRandomLayout(),
      gradientStyle: getRandomGradient(),
      icon: "Unlock",
    },
    {
      slideNumber: 2,
      headline: "Understanding > Memorization",
      subtext:
        "When children understand concepts deeply, they retain knowledge and apply it creatively.",
      layoutStyle: getRandomLayout(),
      gradientStyle: getRandomGradient(),
      icon: "Lightbulb",
    },
    {
      slideNumber: 3,
      headline: "Parent Support Helps",
      subtext:
        "Your encouragement and patience create a positive learning environment for mathematics.",
      layoutStyle: getRandomLayout(),
      gradientStyle: getRandomGradient(),
      icon: "Users",
    },
    {
      slideNumber: 4,
      headline: "Celebrate Small Wins",
      subtext:
        "Every correct answer and improvement is a step forward. Celebrate the journey, not just destinations.",
      layoutStyle: getRandomLayout(),
      gradientStyle: getRandomGradient(),
      icon: "Award",
    },
    {
      slideNumber: 5,
      headline: "Start the Math Adventure",
      subtext:
        "Your child has amazing potential. With support and practice, they'll discover their true abilities.",
      callToAction: "Begin your child's math transformation today.",
      layoutStyle: getRandomLayout(),
      gradientStyle: getRandomGradient(),
      icon: "Rocket",
    },
  ],
};

export function generateFallbackContent(
  idea: string,
  format: string,
  slideCount: number
): FallbackContentResult {
  const lowerIdea = idea.toLowerCase();

  // Find matching topic template
  let selectedTemplate = defaultTemplate;
  for (const template of topicTemplates) {
    if (template.keywords.some((keyword) => lowerIdea.includes(keyword))) {
      selectedTemplate = template as typeof defaultTemplate;
      break;
    }
  }

  // Use the selected template's slides
  const { title, hashtags, suggestedCaption } = selectedTemplate;

  // Generate slides with guaranteed callToAction on last slide
  const generatedSlides: Slide[] = selectedTemplate.slides
    .slice(0, slideCount)
    .map((slide, index) => {
      const isLastSlide = index === slideCount - 1;
      return {
        slideNumber: index + 1,
        headline: slide.headline,
        subtext: slide.subtext,
        ...(isLastSlide && {
          callToAction:
            slide.callToAction || "Learn more about Cuemath today.",
        }),
        layoutStyle: slide.layoutStyle,
        gradientStyle: slide.gradientStyle,
        icon: slide.icon,
      };
    });

  const finalHashtags = ["#Cuemath", ...hashtags.slice(0, 4)];

  return {
    slides: generatedSlides,
    hashtags: finalHashtags,
    suggestedCaption,
    title,
  };
}
