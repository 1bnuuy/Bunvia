import {
  faBook,
  faBrain,
  faCircleInfo,
  faListCheck,
  faPen,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

//--------------Navigation--------------//
export const availablePaths = [
  "/",
  "/about",
  "/todolist",
  "/dictionary",
  "/notepad",
];

export const links = [
  {
    name: "About",
    icon: faCircleInfo,
    path: "/about",
  },

  {
    name: "Tasks",
    icon: faListCheck,
    path: "/todolist",
  },

  {
    name: "Dictionary",
    icon: faBook,
    path: "/dictionary",
  },

  {
    name: "Notepad",
    icon: faBrain,
    path: "/notepad",
  },
];

//--------------Theme--------------//
export const framerAnimProps = {
  animDelay: 0.25,
  animDuration: 0.3,
  viewPercent: 0.3,
};

export const btnScale = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

export const btnRelocateLeft = {
  initial: { scale: 1, x: 0 },
  hover: { x: -20 },
  tap: { scale: 0.95, x: -20 },
};

export const btnRelocateRight = {
  initial: { scale: 1, x: 0 },
  hover: { x: 20 },
  tap: { scale: 0.95, x: 20 },
};

export const Pop = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

export const Opacity = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FadeInBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export const FadeInTop = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};

export const SlideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

export const SlideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

//--------------Home--------------//
export const Features = [
  {
    name: "Tasks & Priorities",
    icon: faPen,
    desc: "Stay on track by ticking off tasks, one at a time.",
  },

  {
    name: "Vocabulary Builder",
    icon: faBook,
    desc: "Your pocket-sized dictionary for learning on the go.",
  },

  {
    name: "Ideas & Insights",
    icon: faStickyNote,
    desc: "Capture notes and ideas in a professional, organized space.",
  },
];

export const Journey = [
  "Discover",
  "Organize",
  "Plan",
  "Learn",
  "Practice",
  "Focus",
  "Reflect",
  "Share",
  "Achieve",
  "Grow",
];

//--------------Footer--------------//
export const socialMedia = [
  {
    name: "Facebook",
    path: "https://web.facebook.com/iiOwl",
  },

  {
    name: "Reddit",
    path: "https://www.reddit.com/user/Budget-Apartment9943",
  },

  {
    name: "Github",
    path: "https://github.com/1bnuuy",
  },

  {
    name: "Youtube",
    path: "https://www.youtube.com/channel/UCHJ8C76GhJ9vXZ0uUxd9xPg",
  },
];
