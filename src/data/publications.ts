/**
 * Third-party publications and directories that feature Adam Belda.
 * Rendered on /about and referenced in that page's Person schema (subjectOf)
 * so search engines and AI crawlers can tie these external mentions to the
 * same entity as adambelda.com.
 */
export interface Publication {
  title: string;
  publisher: string;
  url: string;
  description: string;
}

export const publications: Publication[] = [
  {
    title: "Adam Belda of Adam Blogs",
    publisher: "Travel with Karla",
    url: "https://travelwithkarla.com/2020/01/21/adam-belda-of-adam-blogs/",
    description:
      "A fellow blogger's feature on how Adam Blogs started, his years dancing with the G-Force dance group, and what kept him writing alongside a full-time career.",
  },
  {
    title: "List of Cavite Bloggers That You Should Be Connecting With",
    publisher: "ThinkAbleBox",
    url: "https://thinkablebox.com/list-of-cavite-bloggers-that-you-should-be-connecting-with/",
    description:
      "A roundup of Cavite-based bloggers naming Adam for his food, travel, gaming, and technology coverage, and for founding Relaks Gaming, a competitive League of Legends Philippines esports team.",
  },
  {
    title: "Philippines Male Bloggers",
    publisher: "Feedspot",
    url: "https://bloggers.feedspot.com/philippines_male_bloggers/",
    description:
      "Feedspot's ranked directory of Philippine male bloggers, listing Adam's site for its food, travel, and technology writing alongside his IT career.",
  },
  {
    title: "The Four Who Stepped Up: Stories Behind the Numbers",
    publisher: "MMDC (Mapúa Malayan Colleges Mindanao)",
    url: "https://www.mmdc.mcl.edu.ph/news-and-events/lifestyle-career-tips/the-four-who-stepped-up-stories-behind-the-numbers/",
    description:
      "MMDC profiles Adam as one of four working students who went back to formal IT education mid-career, alongside his years of technology leadership experience.",
  },
];
